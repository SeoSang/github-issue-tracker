import { OPTION_STORAGE_KEY } from '../../type/constant'
import { defaultOptionInfo, fillDefaultValueToOptionInfo, isValidOptionInfoObject } from './lib'
import type { OptionInfo } from '../../type/options'

export const optionStorage = {
  save: async (obj: OptionInfo) => {
    const LS = chrome?.storage?.local
    if (!isValidOptionInfoObject(obj)) return
    LS && (await LS.set({ [OPTION_STORAGE_KEY]: obj }))
  },

  load: async () => {
    const LS = chrome?.storage?.local
    const optionInfoByChromeLocalStorage: OptionInfo = (await LS?.get(OPTION_STORAGE_KEY))?.[OPTION_STORAGE_KEY]
    const optionInfo = optionInfoByChromeLocalStorage ?? {}
    fillDefaultValueToOptionInfo(optionInfo)
    return optionInfo
  },

  getTargetUrl: async () => {
    const options = await optionStorage.load()
    return options?.url ?? defaultOptionInfo.url
  },
}
