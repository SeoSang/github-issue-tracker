<script>
  import { pageIndex, recentHistory } from '../../store/svelte'
  import { COUNT_PER_PAGE } from '../../type/constant'

  let maxPageIndex

  $: maxPageIndex = Math.max(Math.floor(($recentHistory?.length - 1) / COUNT_PER_PAGE), 0)

  const onClickNext = () => {
    $pageIndex += 1
  }

  const onClickPrev = () => {
    $pageIndex -= 1
  }
</script>


<div>
    <button on:click|stopPropagation={onClickPrev} style="visibility: {$pageIndex > 0 ? 'visible' : 'hidden'}">⬅</button>
    <button on:click|stopPropagation={onClickNext} style="visibility: {$pageIndex < maxPageIndex? 'visible' : 'hidden'}">➡</button>
</div>

<style lang="scss">
  div {
    display: flex;
    position: relative;
    align-items: center;
    gap: 6px;
  }
</style>