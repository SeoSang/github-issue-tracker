import { getRegExp, RegexType } from './regex'

export const pinToString = (text: string) => (text.endsWith(' 📌') ? text : `${text} 📌`)
export const unpinToString = (text: string) => (text.endsWith(' 📌') ? text.slice(0, text.length - 2) : text)

export const isIssueDetailPageUrl = (targetUrl: string, url: string) => {
  const regexResult = getRegExp(targetUrl, RegexType.ISSUE_PAGE).exec(url)
  return !!regexResult
}
export const isIssueListPageUrl = (targetUrl: string, url: string) => {
  const regexResult = getRegExp(targetUrl, RegexType.ISSUES_PAGE).exec(url)
  return !!regexResult
}
export const isPrDetailPageUrl = (targetUrl: string, url: string) => {
  const regexResult = getRegExp(targetUrl, RegexType.PR_PAGE).exec(url)
  return !!regexResult
}
export const isPrListPageUrl = (targetUrl: string, url: string) => {
  const regexResult = getRegExp(targetUrl, RegexType.PRS_PAGE).exec(url)
  return !!regexResult
}
