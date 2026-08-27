'use strict'

var DEFAULT_MAX_HEADER_LENGTH = 2000
var hasOwn = Object.prototype.hasOwnProperty
var environmentDefaults = readEnvironmentDefaults()

function isUnsafeKey (key) {
  return key === '__proto__' || key === 'prototype' || key === 'constructor'
}

function safeSet (target, key, value) {
  if (!isUnsafeKey(key)) target[key] = value
}

function readEnvironmentDefaults () {
  var env = typeof process === 'object' && process && process.env
    ? process.env
    : {}
  var parsed = parseInt(env.PARSE_LINK_HEADER_MAXLEN, 10)

  return {
    maxHeaderLength: parsed || DEFAULT_MAX_HEADER_LENGTH,
    throwOnMaxHeaderLengthExceeded:
      env.PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED != null
  }
}

function resolveOptions (options) {
  options = options || {}

  var maxHeaderLength = Object.prototype.hasOwnProperty.call(options, 'maxHeaderLength')
    ? Number(options.maxHeaderLength)
    : environmentDefaults.maxHeaderLength

  if (!Number.isFinite(maxHeaderLength) || maxHeaderLength < 0) {
    maxHeaderLength = environmentDefaults.maxHeaderLength
  }

  return {
    maxHeaderLength: Math.floor(maxHeaderLength),
    throwOnMaxHeaderLengthExceeded:
      Object.prototype.hasOwnProperty.call(options, 'throwOnMaxHeaderLengthExceeded')
        ? Boolean(options.throwOnMaxHeaderLengthExceeded)
        : environmentDefaults.throwOnMaxHeaderLengthExceeded
  }
}

function checkHeader (linkHeader, options) {
  if (!linkHeader) return false

  var settings = resolveOptions(options)
  if (linkHeader.length <= settings.maxHeaderLength) return true

  if (settings.throwOnMaxHeaderLengthExceeded) {
    throw new Error(
      'Input string too long, it should be under ' +
      settings.maxHeaderLength +
      ' characters.'
    )
  }

  return false
}

function splitLinkValues (linkHeader) {
  var links = []
  var start = 0
  var inAngle = false
  var inQuote = false
  var escaped = false

  for (var index = 0; index < linkHeader.length; index += 1) {
    var character = linkHeader.charAt(index)

    if (escaped) {
      escaped = false
      continue
    }
    if (inQuote && character === '\\') {
      escaped = true
      continue
    }
    if (!inAngle && character === '"') {
      inQuote = !inQuote
      continue
    }
    if (!inQuote && character === '<') {
      inAngle = true
      continue
    }
    if (!inQuote && character === '>') {
      inAngle = false
      continue
    }
    if (character !== ',' || inAngle || inQuote) continue

    var next = index + 1
    while (next < linkHeader.length && /\s/.test(linkHeader.charAt(next))) {
      next += 1
    }
    if (linkHeader.charAt(next) !== '<') continue

    links.push(linkHeader.slice(start, index))
    start = next
    index = next - 1
  }

  links.push(linkHeader.slice(start))
  return links
}

function splitParameters (value) {
  var parameters = []
  var start = 0
  var inQuote = false
  var escaped = false

  for (var index = 0; index < value.length; index += 1) {
    var character = value.charAt(index)

    if (escaped) {
      escaped = false
      continue
    }
    if (inQuote && character === '\\') {
      escaped = true
      continue
    }
    if (character === '"') {
      inQuote = !inQuote
      continue
    }
    if (character !== ';' || inQuote) continue

    parameters.push(value.slice(start, index))
    start = index + 1
  }

  parameters.push(value.slice(start))
  return parameters
}

function unquote (value) {
  if (value.charAt(0) !== '"') return value.trim()

  var output = ''
  var escaped = false
  for (var index = 1; index < value.length; index += 1) {
    var character = value.charAt(index)
    if (escaped) {
      output += character
      escaped = false
    } else if (character === '\\') {
      escaped = true
    } else if (character === '"') {
      return output
    } else {
      output += character
    }
  }

  return output
}

function parseParameters (value) {
  var output = {}
  var parts = splitParameters(value)

  parts.shift()
  for (var index = 0; index < parts.length; index += 1) {
    var part = parts[index]
    var equals = part.indexOf('=')
    if (equals < 1) continue

    var key = part.slice(0, equals).trim()
    var rawValue = part.slice(equals + 1).trim()
    if (!key || !rawValue) continue

    safeSet(output, key, unquote(rawValue))
  }

  return output
}

function parseQuery (linkUrl) {
  var output = {}
  var question = linkUrl.indexOf('?')
  var fragment = linkUrl.indexOf('#')

  if (question < 0 || (fragment >= 0 && question > fragment)) return output

  var query = linkUrl.slice(question + 1, fragment < 0 ? linkUrl.length : fragment)
  var parameters = new URLSearchParams(query)

  parameters.forEach(function (value, key) {
    if (isUnsafeKey(key)) return

    if (!hasOwn.call(output, key)) {
      output[key] = value
    } else if (Array.isArray(output[key])) {
      output[key].push(value)
    } else {
      output[key] = [output[key], value]
    }
  })

  return output
}

function parseLink (link) {
  try {
    var close = link.indexOf('>')
    if (close < 0) return null

    var linkUrl = link.slice(0, close)
    if (linkUrl.charAt(0) === '<') linkUrl = linkUrl.slice(1)

    var query = parseQuery(linkUrl)
    var attributes = parseParameters(link.slice(close + 1))
    var info = {}

    Object.keys(query).forEach(function (key) {
      safeSet(info, key, query[key])
    })
    Object.keys(attributes).forEach(function (key) {
      safeSet(info, key, attributes[key])
    })
    info.url = linkUrl

    return info
  } catch {
    return null
  }
}

function addRelations (result, info) {
  if (!info || !info.rel) return result

  info.rel.split(/\s+/).forEach(function (relation) {
    if (!relation || isUnsafeKey(relation)) return

    var link = {}
    Object.keys(info).forEach(function (key) {
      safeSet(link, key, info[key])
    })
    link.rel = relation
    result[relation] = link
  })

  return result
}

function parseLinkHeader (linkHeader, options) {
  if (!checkHeader(linkHeader, options)) return null

  return splitLinkValues(linkHeader)
    .map(parseLink)
    .reduce(addRelations, {})
}

module.exports = parseLinkHeader
module.exports.parseLinkHeader = parseLinkHeader
