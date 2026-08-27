'use strict';

const headerInput = document.querySelector('#header-input');
const maxLength = document.querySelector('#max-length');
const throwOnLimit = document.querySelector('#throw-on-limit');
const moduleStyle = document.querySelector('#module-style');
const output = document.querySelector('#result-output code');
const relationCount = document.querySelector('#relation-count');
const headerSize = document.querySelector('#header-size');
const statusText = document.querySelector('#status-text');
const statusIndicator = document.querySelector('#status-indicator');
const limitFact = document.querySelector('#limit-fact');
const runtimeFact = document.querySelector('#runtime-fact');
const initialHeader = headerInput.value;

document.querySelector('#generate-button').addEventListener('click', render);
document.querySelector('#reset-button').addEventListener('click', () => {
  headerInput.value = initialHeader;
  maxLength.value = '2000';
  throwOnLimit.checked = false;
  render();
});
for (const control of [headerInput, maxLength, throwOnLimit, moduleStyle]) {
  control.addEventListener('input', render);
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const target = document.querySelector(button.dataset.copy);
  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    statusText.textContent = 'Copied to clipboard';
  } catch {
    statusText.textContent = 'Copy unavailable';
  }
});

render();

function render() {
  const header = headerInput.value;
  const limit = Math.max(0, Math.floor(Number(maxLength.value) || 0));
  headerSize.textContent = `${header.length.toLocaleString()} characters`;
  limitFact.textContent = `${limit.toLocaleString()}-character limit`;
  runtimeFact.textContent = moduleStyle.value === 'esm'
    ? 'ESM default and named exports'
    : 'callable CommonJS export';

  try {
    if (header.length > limit) {
      if (throwOnLimit.checked) throw new Error(`Input exceeds ${limit.toLocaleString()} characters`);
      setResult(null, 'Header rejected by configured limit', true);
      return;
    }
    const parsed = parseHeader(header);
    setResult(parsed, 'Header parsed', false);
  } catch (error) {
    output.textContent = `${error.name}: ${error.message}`;
    relationCount.textContent = '0 relations';
    statusText.textContent = 'Parser reported an error';
    statusIndicator.classList.add('error');
  }
}

function setResult(value, message, warning) {
  output.textContent = JSON.stringify(value, null, 2);
  const count = value ? Object.keys(value).length : 0;
  relationCount.textContent = `${count} ${count === 1 ? 'relation' : 'relations'}`;
  statusText.textContent = message;
  statusIndicator.classList.toggle('error', warning);
}

function parseHeader(header) {
  if (!header) return null;
  const result = {};
  for (const part of splitLinks(header)) {
    const close = part.indexOf('>');
    if (close < 0) continue;
    const url = part.slice(part.startsWith('<') ? 1 : 0, close);
    const attributes = parseAttributes(part.slice(close + 1));
    if (!attributes.rel) continue;
    const values = Object.fromEntries(new URLSearchParams(queryOf(url)));
    const info = safeObject({ ...values, ...attributes, url });
    for (const relation of attributes.rel.split(/\s+/)) {
      if (!relation || unsafe(relation)) continue;
      result[relation] = safeObject({ ...info, rel: relation });
    }
  }
  return result;
}

function splitLinks(header) {
  const parts = [];
  let start = 0;
  let angle = false;
  let quote = false;
  let escaped = false;
  for (let index = 0; index < header.length; index += 1) {
    const character = header[index];
    if (escaped) { escaped = false; continue; }
    if (quote && character === '\\') { escaped = true; continue; }
    if (!angle && character === '"') { quote = !quote; continue; }
    if (!quote && character === '<') { angle = true; continue; }
    if (!quote && character === '>') { angle = false; continue; }
    if (character !== ',' || angle || quote) continue;
    let next = index + 1;
    while (/\s/.test(header[next] || '')) next += 1;
    if (header[next] !== '<') continue;
    parts.push(header.slice(start, index));
    start = next;
    index = next - 1;
  }
  parts.push(header.slice(start));
  return parts;
}

function parseAttributes(value) {
  const result = {};
  const parts = splitQuoted(value, ';');
  parts.shift();
  for (const part of parts) {
    const equals = part.indexOf('=');
    if (equals < 1) continue;
    const key = part.slice(0, equals).trim();
    let attribute = part.slice(equals + 1).trim();
    if (!key || !attribute || unsafe(key)) continue;
    if (attribute.startsWith('"')) attribute = attribute.slice(1, attribute.lastIndexOf('"'));
    result[key] = attribute.replace(/\\([\\"])/g, '$1');
  }
  return result;
}

function splitQuoted(value, delimiter) {
  const parts = [];
  let start = 0;
  let quote = false;
  let escaped = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (escaped) { escaped = false; continue; }
    if (quote && character === '\\') { escaped = true; continue; }
    if (character === '"') { quote = !quote; continue; }
    if (character === delimiter && !quote) {
      parts.push(value.slice(start, index));
      start = index + 1;
    }
  }
  parts.push(value.slice(start));
  return parts;
}

function queryOf(url) {
  const question = url.indexOf('?');
  const hash = url.indexOf('#');
  if (question < 0 || (hash >= 0 && question > hash)) return '';
  return url.slice(question + 1, hash < 0 ? url.length : hash);
}

function safeObject(value) {
  const result = {};
  for (const [key, item] of Object.entries(value)) if (!unsafe(key)) result[key] = item;
  return result;
}

function unsafe(key) {
  return key === '__proto__' || key === 'prototype' || key === 'constructor';
}

