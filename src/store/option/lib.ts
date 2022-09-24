import { MAX_RECENT_ISSUES_COUNT, MAX_RECENT_PRS_COUNT, OPTION_PIN_COLOR, OPTION_READ_COLOR } from '../../type/constant'
import type { OptionInfo } from '../../type/options'

export const defaultOptionInfo: OptionInfo = {
  url: 'github.com',
  maxIssuesCount: MAX_RECENT_ISSUES_COUNT,
  maxPrsCount: MAX_RECENT_PRS_COUNT,
  readColor: OPTION_READ_COLOR,
  pinColor: OPTION_PIN_COLOR,
}

export const isValidOptionInfoObject = (obj: OptionInfo): boolean => {
  return typeof obj?.url === 'string' && typeof obj?.maxIssuesCount === 'number' && typeof obj?.maxPrsCount === 'number'
}

export const fillDefaultValueToOptionInfo = (optionInfo: OptionInfo) => {
  optionInfo.url = optionInfo?.url || defaultOptionInfo.url
  optionInfo.maxIssuesCount = optionInfo?.maxIssuesCount || defaultOptionInfo.maxIssuesCount
  optionInfo.maxPrsCount = optionInfo?.maxPrsCount || defaultOptionInfo.maxPrsCount
  optionInfo.readColor = optionInfo?.readColor || defaultOptionInfo.readColor
  optionInfo.pinColor = optionInfo?.pinColor || defaultOptionInfo.pinColor
}
