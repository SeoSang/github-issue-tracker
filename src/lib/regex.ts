export enum RegexType {
  ISSUE_PAGE = 'ISSUE_PAGE',
  ISSUES_PAGE = 'ISSUES_PAGE',
  PR_PAGE = 'PR_PAGE',
  PRS_PAGE = 'PRS_PAGE',
}

export const getRegExp = (url: string, regexType: RegexType) => {
  let _url = url
  if (url.startsWith('https://')) {
    _url = url.slice(8, url.length)
  }
  switch (regexType) {
    case RegexType.ISSUE_PAGE:
      return new RegExp(`https?:\/\/\\w*.?${_url}\/([\\w#-]+)\/([\\w#-]+)\/issues\/(\\d+)`, 'g')
    case RegexType.ISSUES_PAGE:
      return new RegExp(`https?:\/\/\\w*.?${_url}\/([\\w#-]+)\/([\\w#-]+)\/issues`, 'g')
    case RegexType.PR_PAGE:
      return new RegExp(`https?:\/\/\\w*.?${_url}\/([\\w#-]+)\/([\\w#-]+)\/pull\/(\\d+)`, 'g')
    case RegexType.PRS_PAGE:
      return new RegExp(`https?:\/\/\\w*.?${_url}\/([\\w#-]+)\/([\\w#-]+)\/pulls`, 'g')
  }
}
