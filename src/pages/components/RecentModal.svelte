<script lang="ts">
    import {
        debouncedSearchText,
        isRecentHistoryOpen,
        isRecentPrs,
        pageIndex,
        recentHistory,
        selectedOrg,
        selectedRepo
    } from "../../store/svelte";
    import SelectButton from './SelectButton.svelte'
    import {filterIssueInfoList, getAllOrgs, getAllRepos} from "../../lib/recent";
    import PintButton from './PintButton.svelte'
    import SearchBar from './SearchBar.svelte'
    import PageContainer from './PageContainer.svelte'
    import {COUNT_PER_PAGE} from "../../type/constant";
    import IssueInfoContainer from './IssueInfoContainer.svelte'
    import {generateColorMap} from "../../lib/color";

    export let isDev
    export let escapedSelectedRepo
    export let escapedSelectedOrg
    export let filteredRecentHistory
    export let orgs = []
    export let repos = []
    export let colorMap = {}
    let isFilteredPinned = false

    const onClickExit = () => {
        $isRecentHistoryOpen = false;
    }

    $: repos = getAllRepos($recentHistory)
    $: colorMap = generateColorMap(repos)
    $: orgs = getAllOrgs($recentHistory)

    $: escapedSelectedRepo = $selectedRepo === '' ? 'repo' : $selectedRepo
    $: escapedSelectedOrg = $selectedOrg === '' ? 'org' : $selectedOrg
    $: filteredRecentHistory = filterIssueInfoList({
        issues: $recentHistory,
        repo: $selectedRepo,
        org: $selectedOrg,
        text: $debouncedSearchText,
        isPinned: isFilteredPinned
    })?.sort((a, b) => b.createdAt - a.createdAt).slice($pageIndex * COUNT_PER_PAGE, ($pageIndex + 1) * COUNT_PER_PAGE)

</script>

<div class="modalContainer">
    <header>
        <div class="searchContainer">
            <SearchBar/>
        </div>
        <h3>Recent {$isRecentPrs ? 'PRs  🚀' : 'Issues  📈'}</h3>
        <div class="buttonContainer">
            <PageContainer/>
            <SelectButton options={orgs} text={escapedSelectedOrg} type="org"/>
            <SelectButton options={repos} text={escapedSelectedRepo} type="repo"/>
            <PintButton isPinned={isFilteredPinned} onClick={()=>{isFilteredPinned = !isFilteredPinned}}/>
        </div>
        <button class="button red" on:click={onClickExit}></button>
    </header>
    <ul>
        {#each filteredRecentHistory as recent}
            <IssueInfoContainer issueInfo={recent} colorMap={colorMap}/>
        {/each}
    </ul>
</div>
{#if isDev}
    <div class="modalContainer">
        <header>
            <div class="searchContainer">
                <SearchBar/>
            </div>
            <h3>Recent Issues</h3>
            <div class="buttonContainer">
                <PageContainer/>
                <SelectButton text={'org'} options={orgs}/>
                <SelectButton text={'repo'} options={repos}/>
                <PintButton isPinned={isFilteredPinned} onClick={()=>{alert('filter pin test')
                        isFilteredPinned = !isFilteredPinned}}/>
            </div>
            <button class="button red" on:click={onClickExit}></button>
        </header>
        <ul>
            <IssueInfoContainer issueInfo={{repo:'repo', createdAt: 12312516, text:'제목 테스트'}} colorMap={colorMap}/>
        </ul>
    </div>
{/if}

<style lang="scss">
  .modalContainer {
    position: fixed;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 9999999;
    width: 80%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    border: 1px solid #7F7F7F;
  }

  h3 {
    color: black;
    text-align: center;
    margin: 0;
    padding: 5px 0;
    text-shadow: 0 0 3px #828282;
  }

  .searchContainer {
    display: flex;
    position: absolute;
    left: 8px;
    align-items: center;
    justify-content: center;

  }

  .buttonContainer {
    display: flex;
    position: absolute;
    right: 40px;
    flex-direction: row;
    gap: 5px;
    border: none;
    background: none;
    align-items: center;
  }

  header {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    border-bottom: 2px solid #7F7F7F;
    border-radius: 12px 12px 0 0;
    height: 40px;
    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);
    background: -ms-linear-gradient(top, #ebebeb, #d5d5d5);
    background: -o-linear-gradient(top, #ebebeb, #d5d5d5);
    background: linear-gradient(top, #ebebeb, #d5d5d5);

    .button {
      position: absolute;
      cursor: pointer;
      top: 5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, .8) 0%, rgba(255, 255, 255, 0) 100%);
      }

      &:after {
        content: '';
        position: absolute;
        bottom: -12px;
        left: 0;
        width: 100%;
        height: 20px;
      }

      &.red {
        right: 10px;
        background-color: #D2493F;
        border: 1px solid #7b1c1a;
        box-shadow: 0 1px 2px #401110;
      }

      &:active {
        box-shadow: 0 1px 1px #401110;
      }

      &:after {
        background: radial-gradient(ellipse at center, rgba(253, 198, 195, 1) 0%, rgba(221, 79, 67, 0) 100%);
      }
    }
  }

  ul {
    position: relative;
    padding: 0.3rem;
  }
</style>