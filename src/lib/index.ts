export const getIssueElements = () => {
  const elements = document.querySelectorAll('a[id^="issue_"]')
  return elements as NodeListOf<HTMLAnchorElement>
}

export const getIssueTitleText = () => {
  const element = document.getElementsByClassName('js-issue-title')[0]
  if (element) {
    return element.innerHTML.trim()
  }
  const titleElement = document.getElementsByTagName('title')[0]
  const titleElementInnerText = titleElement.innerText
  return titleElementInnerText.slice(0, titleElementInnerText.indexOf('·')).trim()
}

export const makeIssueInfoId = ({
  issueNumber,
  org,
  repo,
}: {
  issueNumber: number | string
  org: string
  repo: string
}) => `issue_${issueNumber}_link:${org}:${repo}`

export const makeIssueInfoIdByElement = ({ elementId, org, repo }: { elementId: string; org: string; repo: string }) =>
  `${elementId}:${org}:${repo}`
