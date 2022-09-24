<script lang="ts">
    import PintButton from './PintButton.svelte'
    import {toDateSummaryString} from '../../lib/date'
    import {IssueInfo} from '../../type'
    import {HistoryType} from '../../type/enum'
    import {loadHistory, togglePinIssue} from '../../lib/store'
    import {loadRecentHistory} from '../../lib/recent'
    import {isRecentHistoryOpen, isRecentPrs} from '../../store/svelte'
    import classNames from 'classnames'

    export let mouseOn = false
    export let issueInfo
    export let colorMap

    let color
    let backgroundColor

    const onClick = (_issueInfo: IssueInfo) => () => {
        _issueInfo.href && (window.open(_issueInfo.href))
        $isRecentHistoryOpen = false
    }

    const onClickPinned = (_issueInfo: IssueInfo) => () => {
        togglePinIssue(_issueInfo, () => {
            loadRecentHistory($isRecentPrs)
            loadHistory({ isPrs: $isRecentPrs })
        }, $isRecentPrs)
    }
    
    $: color = colorMap?.[issueInfo?.repo]?.text ?? '#125B50'
    $: backgroundColor = colorMap?.[issueInfo?.repo]?.background ?? '#F8B400'
    

    const isPinned = (_issueInfo: IssueInfo) => _issueInfo.historyType === HistoryType.PINNED
    
    const onClickRepo = () => {
        if (!issueInfo?.repo || !issueInfo?.org) return 
        window.open(`https://github.com/${issueInfo.org}/${issueInfo.repo}/${$isRecentPrs ? 'pulls' : 'issues'}`)
        $isRecentHistoryOpen = false
    }

</script>

<li on:click|once={onClick(issueInfo)}>
    <PintButton isPinned={isPinned(issueInfo)} onClick={onClickPinned(issueInfo)}/>
    <p>{issueInfo.text}</p>
    <div class="info">
        <div class="repo" 
            style="color: {color}; background-color: {backgroundColor}"
            on:focus={()=>{}}
            on:mouseover={()=>{mouseOn = true}}
            on:blur={()=>{mouseOn = false}}
            on:mouseout={()=>{mouseOn = false}}
            on:click|stopPropagation={onClickRepo}>
            <span 
                class={classNames('tooltip', {mouseOn})}
                style="background-color: {backgroundColor}">
                {issueInfo.repo}
            </span>
            <span>{issueInfo.repo[0]?.toUpperCase()}</span>
        </div>
        <span class="createdAt">{toDateSummaryString(new Date(issueInfo.createdAt))}</span>
    </div>
</li>

<style lang="scss">
  li {
    display: flex;
    cursor: pointer;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    height: 35px;

    &:hover {
      background: #EFEFEF;
    }

    p {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0.3rem 0;
      padding: 0 8px;
      color: #383838;
      font-size: 1rem;
    }

    span {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: auto;
      color: #575757FF;
      font-size: 0.8rem;
      padding: 0px 2px;
    }
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-self: end;
    margin-left: auto;
    align-content: center;
    align-items: center;
    gap: 6px;
    height: 100%;
  }
  
  .repo {
    display: flex;
    position: relative;
    align-content: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    &:hover {
      box-shadow: none;
    }
    
    span {
      display: flex;
      align-content: center;
      align-items: center;
      color: inherit;
      font-size: 0.85rem;
      font-weight: bold;
      margin: 0;
    }
  }
  
  .tooltip {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    
    visibility: hidden;
    &.mouseOn {
      visibility: visible;
    }
  }
</style>
