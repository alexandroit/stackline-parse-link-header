declare namespace parseLinkHeader {
  type ParameterValue = string | string[]

  interface Link {
    url: string
    rel: string
    [parameter: string]: ParameterValue | undefined
  }

  interface Links {
    [relation: string]: Link | undefined
  }

  interface Options {
    maxHeaderLength?: number
    throwOnMaxHeaderLengthExceeded?: boolean
  }
}

declare function parseLinkHeader(
  linkHeader: string | null | undefined,
  options?: parseLinkHeader.Options
): parseLinkHeader.Links | null

export = parseLinkHeader

