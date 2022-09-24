<script lang="ts">
    import RecentModal from "./pages/components/RecentModal.svelte";
    import {loadHistory, makeIssueInfo, updateRecentHistory} from './lib/store'
    import {getIssueTitleText} from './lib'
    import {isRecentHistoryOpen, isRecentPrs} from "./store/svelte";
    import {goToRecentIssue, goToRecentPr, loadRecentHistory} from "./lib/recent";
    import {EVENT_TYPE, IssueType} from "./type/enum";
    import {isIssueListPageUrl, isPrListPageUrl} from "./lib/etc";
    import {clickOutside} from "./lib/clickOutside";
    import {optionStorage} from "./store/option/storage";


    const init = async () => {
        const targetUrl = await optionStorage.getTargetUrl()
        const url = document.location.href
        const isPrListPage = isPrListPageUrl(targetUrl, url)
        const isTarget = isPrListPage || isIssueListPageUrl(targetUrl, url)
        if (isTarget) {
            loadHistory({isPrs: isPrListPage})
        }
    }

    init()

    const onClickOutside = () => {
        $isRecentHistoryOpen = false
    }

    const onWindowKeydown = (e: KeyboardEvent) => {
        if (!$isRecentHistoryOpen) return
        if (e.key === 'Escape') {
            $isRecentHistoryOpen = false
        }
    }

    chrome.runtime.onMessage.addListener((request) => {
        if (request.eventType === EVENT_TYPE.RECENT_ISSUES) {
            $isRecentPrs = false
            $isRecentHistoryOpen = !$isRecentHistoryOpen
            loadRecentHistory()
        }
        if (request.eventType === EVENT_TYPE.RECENT_PRS) {
            $isRecentPrs = true
            $isRecentHistoryOpen = !$isRecentHistoryOpen
            loadRecentHistory(true)
        }
        if (request.eventType === EVENT_TYPE.ISSUE_LOADED) {
            const {issueNumber, url, org, repo, type} = request
            const text = getIssueTitleText()
            const issueInfo = makeIssueInfo({issueNumber, href: url, text, repo, org, type})
            issueInfo && updateRecentHistory(issueInfo, type === IssueType.PR)
        }
        if (request.eventType === EVENT_TYPE.GO_RECENT_PR) {
            goToRecentPr()
        }
        if (request.eventType === EVENT_TYPE.GO_RECENT_ISSUE) {
            goToRecentIssue()
        }
    })
</script>


<svelte:window on:keydown={onWindowKeydown}/>
{#if $isRecentHistoryOpen}
    <div on:click_outside={onClickOutside} use:clickOutside>
        <RecentModal/>
    </div>
{/if}
