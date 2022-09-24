export interface IssueInfoMap {
  [id: string]: IssueInfo
}

export interface IssueInfo {
  id: string
  repo?: string
  org?: string
  issueNumber?: string
  href?: string
  type?: string
  text?: string
  historyType?: string
  createdAt?: number
}
