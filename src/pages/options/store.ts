import { writable } from 'svelte/store'
import { defaultOptionInfo } from '../../store/option/lib'
import { optionStorage } from '../../store/option/storage'

export const options = writable(defaultOptionInfo)
export const optionLoaded = writable(false)

export function createOptonsForm() {
  return {
    init: async () => {
      const storageOptions = await optionStorage.load()
      storageOptions && options.set(storageOptions)
      optionLoaded.set(true)
      return true
    },
  }
}

export const restaurant_store = createOptonsForm()
