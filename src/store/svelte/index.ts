import { Writable, writable } from 'svelte/store'
import type { IssueInfo } from '../../type'

export let isRecentHistoryOpen = writable(false)
export let isRecentPrs = writable(true)

export let recentHistory: Writable<IssueInfo[]> = writable([])

export let searchText: Writable<string> = writable('')
export let debouncedSearchText: Writable<string> = writable('')

export let selectedRepo: Writable<string> = writable('')
export let selectedOrg: Writable<string> = writable('')

export let pageIndex: Writable<number> = writable(0)
