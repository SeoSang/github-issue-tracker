import { parseDetailPageUrl } from './lib/parse'
import { EVENT_TYPE } from './type/enum'
import { optionStorage } from './store/option/storage'

chrome?.commands?.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id ?? 1, { eventType: command })
  })
})

/* Send issue infor when GitHub is loaded */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const url = tab.url
  if (!url || !chrome?.storage) return
  const targetUrl = await optionStorage.getTargetUrl()
  const parseDetailPageResult = parseDetailPageUrl(targetUrl, url)
  if (!parseDetailPageResult) return
  const { repo, org, issueNumber, type } = parseDetailPageResult
  if (!issueNumber) return

  chrome.tabs.sendMessage(tab.id ?? 1, { eventType: EVENT_TYPE.ISSUE_LOADED, url, issueNumber, org, repo, type })
})
