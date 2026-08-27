export type ParameterValue = string | string[]

export interface Link {
  url: string
  rel: string
  [parameter: string]: ParameterValue | undefined
}

export interface Links {
  [relation: string]: Link | undefined
}

export interface Options {
  maxHeaderLength?: number
  throwOnMaxHeaderLengthExceeded?: boolean
}

declare function parseLinkHeader(
  linkHeader: string | null | undefined,
  options?: Options
): Links | null

export { parseLinkHeader }
export default parseLinkHeader

