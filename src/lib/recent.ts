import type { IssueInfo } from '../type'
import { KEY_RECENT_ISSUES, KEY_RECENT_PRS } from '../type/constant'
import { recentHistory } from '../store/svelte'
import { HistoryType } from '../type/enum'

export const getAllRepos = (issues: IssueInfo[]) => {
  if (!issues) return []
  const orgs = new Set()
  issues.filter((issue) => !!issue.repo).forEach((issue) => orgs.add(issue.repo))
  return Array.from(orgs).slice(0, 20)
}

export const getAllOrgs = (issues: IssueInfo[]) => {
  if (!issues) return []
  const org = new Set()
  issues.filter((issue) => !!issue.repo).forEach((issue) => org.add(issue.org))
  return Array.from(org).slice(0, 20)
}

export const filterIssueInfoList = ({
  issues,
  org,
  repo,
  isPinned = false,
  text,
}: {
  issues: IssueInfo[]
  org?: string
  repo?: string
  isPinned?: boolean
  text?: string
}): IssueInfo[] => {
  if (!issues) return []
  let filteredIssues = issues
  if (isPinned) filteredIssues = filteredIssues.filter((issue) => issue.historyType === HistoryType.PINNED)
  if (org) filteredIssues = filteredIssues.filter((issue) => issue.org === org)
  if (repo) filteredIssues = filteredIssues.filter((issue) => issue.repo === repo)
  if (text) filteredIssues = filteredIssues.filter((issue) => issue.text?.toLowerCase().includes(text?.toLowerCase()))
  return filteredIssues
}

export const loadRecentHistory = (isPrs = false) => {
  const targetKey = isPrs ? KEY_RECENT_PRS : KEY_RECENT_ISSUES
  chrome.storage.local.get(targetKey, ({ [targetKey]: _recentHistory }) => {
    recentHistory.set(_recentHistory ?? [])
  })
}

export const goToRecentIssue = () => {
  chrome.storage.local.get(KEY_RECENT_ISSUES, ({ [KEY_RECENT_ISSUES]: recentHistory }) => {
    const targetIssue: IssueInfo = recentHistory?.pop()
    if (targetIssue?.href && window) window.open(targetIssue.href)
  })
}

export const goToRecentPr = () => {
  chrome.storage.local.get(KEY_RECENT_PRS, ({ [KEY_RECENT_PRS]: recentHistory }) => {
    const targetIssue: IssueInfo = recentHistory?.pop()
    if (targetIssue?.href && window) window.open(targetIssue.href)
  })
}
