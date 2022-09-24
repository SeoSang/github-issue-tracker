import type { IssueInfo, IssueInfoMap } from '../type'
import { makeIssueInfoId, makeIssueInfoIdByElement } from './index'
import { HistoryType, IssueType } from '../type/enum'
import { getRegExp, RegexType } from './regex'

export const parseDetailPageUrl = (targetUrl: string, url: string): IssueInfo | null => {
  const issueRegexResult = getRegExp(targetUrl, RegexType.ISSUE_PAGE).exec(url)
  const prRegexResult = getRegExp(targetUrl, RegexType.PR_PAGE).exec(url)
  const targetRegexResult = issueRegexResult ?? prRegexResult
  if (targetRegexResult) {
    const [, org, repo, issueNumber] = targetRegexResult
    const id = makeIssueInfoId({ issueNumber, org, repo })
    return {
      id,
      repo,
      issueNumber,
      org: org,
      type: issueRegexResult ? IssueType.ISSUE : IssueType.PR,
    }
  }
  return null
}

export const parseListPageUrl = (targetUrl: string, url: string): { repo: string; org: string } => {
  const issuesRegexResult = getRegExp(targetUrl, RegexType.ISSUES_PAGE).exec(url)
  const prsRegexResult = getRegExp(targetUrl, RegexType.PRS_PAGE).exec(url)
  const targetRegexResult = issuesRegexResult ?? prsRegexResult
  if (targetRegexResult) {
    const [, org, repo] = targetRegexResult
    return { org: org ?? '', repo: repo ?? '' }
  }
  return { org: '', repo: '' }
}

/* 반드시 브라우저에서 실행되어야함 */
export const parseIssueElement = (targetUrl: string, elem: HTMLAnchorElement): IssueInfo => {
  const url = document?.location?.href
  const { repo, org } = parseListPageUrl(targetUrl, url)
  const elementId = elem.getAttribute('id') ?? ''
  const href = elem.getAttribute('href') ?? ''
  const type = elem.getAttribute('data-hovercard-type') ?? ''
  const id = makeIssueInfoIdByElement({ elementId, org, repo })
  return {
    id,
    href,
    type,
    org,
    repo,
    text: elem.innerText,
    historyType: HistoryType.NONE_READ,
    createdAt: new Date().getTime(),
  }
}

export const makeIssueInfoMap = (issueInfoList: IssueInfo[] = []): IssueInfoMap => {
  let issueInfoMap: IssueInfoMap = {}
  issueInfoList.forEach((issueInfo) => {
    issueInfoMap[issueInfo.id] = issueInfo
  })
  return issueInfoMap
}
