export const OptionInfoSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
    maxIssuesCount: { type: 'integer' },
    maxPrsCount: { type: 'integer' },
  },
  required: ['url', 'maxIssuesCount', 'maxPrsCount'],
  additionalProperties: false,
}

export interface OptionInfo {
  url: string
  maxIssuesCount: number
  maxPrsCount: number
  readColor: string
  pinColor: string
}
