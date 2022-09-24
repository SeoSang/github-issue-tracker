import type { IssueInfo } from '../type'
import { KEY_RECENT_ISSUES, KEY_RECENT_PRS } from '../type/constant'
import { makeIssueInfoMap, parseIssueElement } from './parse'
import { IssueStack } from './stack'
import { getIssueElements, makeIssueInfoId } from './index'
import { pinToString, unpinToString } from './etc'
import { HistoryType } from '../type/enum'
import { optionStorage } from '../store/option/storage'

export const makeIssueInfo = ({
  text,
  href,
  repo,
  issueNumber,
  org,
  type,
}: {
  text: string
  href: string
  repo: string
  issueNumber: number | string
  org: string
  type: string
}): IssueInfo => {
  const id = makeIssueInfoId({ issueNumber, org, repo })
  return { type, repo, org, id, href, text, historyType: HistoryType.READ, createdAt: new Date().getTime() }
}

export const togglePinIssue = (issueInfo: IssueInfo, callback?: Function, isPrs = false) => {
  const targetKey = isPrs ? KEY_RECENT_PRS : KEY_RECENT_ISSUES
  chrome.storage.local.get(targetKey, ({ [targetKey]: recentHistory }) => {
    const toggledRecentHistory = [...recentHistory]
    recentHistory.forEach((recent: IssueInfo, i: number) => {
      if (recent.id === issueInfo.id) {
        const isPinned = recent.historyType === HistoryType.PINNED
        toggledRecentHistory[i] = { ...issueInfo, historyType: isPinned ? HistoryType.READ : HistoryType.PINNED }
      }
    })
    chrome.storage.local.set({ [targetKey]: toggledRecentHistory }, () => {
      callback && callback()
    })
  })
}

export const updateRecentHistory = async (issueInfo: IssueInfo, isPrs = false) => {
  const targetKey = isPrs ? KEY_RECENT_PRS : KEY_RECENT_ISSUES
  const options = await optionStorage.load()
  chrome.storage.local.get(targetKey, ({ [targetKey]: recentHistory }) => {
    const issueStack = new IssueStack(recentHistory, isPrs ? options.maxPrsCount : options.maxIssuesCount)
    issueStack.push(issueInfo)
    chrome.storage.local.set({ [targetKey]: issueStack.toArray() })
  })
}

export const loadHistory = ({ isPrs = false }: { isPrs?: boolean }) => {
  const issueElements = getIssueElements()
  if (!issueElements || issueElements?.length === 0) return
  const targetKey = isPrs ? KEY_RECENT_PRS : KEY_RECENT_ISSUES
  chrome.storage.local.get(targetKey, async ({ [targetKey]: recentHistory }) => {
    const { url: targetUrl, pinColor, readColor } = await optionStorage.load()
    const issueInfoMap = makeIssueInfoMap(recentHistory)
    if (!issueInfoMap) return
    for (const elem of issueElements) {
      const issueInfo = parseIssueElement(targetUrl, elem)
      /* 읽은 이슈 표시 */
      if (issueInfoMap[issueInfo.id]?.historyType === HistoryType.READ) {
        elem.style.setProperty('color', readColor, 'important')
        elem.innerText = unpinToString(elem.innerText)
      }
      if (issueInfoMap[issueInfo.id]?.historyType === HistoryType.PINNED) {
        elem.style.setProperty('color', pinColor, 'important')
        elem.innerText = pinToString(elem.innerText)
      }
    }
  })
}
