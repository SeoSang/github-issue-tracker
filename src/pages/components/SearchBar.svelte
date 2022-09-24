<script>
  import { debouncedSearchText, searchText } from '../../store/svelte'
  import { onMount } from 'svelte'

  let searchInput
  let timer

  const debounce = v => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      $debouncedSearchText = v
    }, 300)
  }

  onMount(() => searchInput.focus())
</script>


<div>
    <input bind:this={searchInput} class="searchInput" on:keyup={({target:{value}}) => {debounce(value)}}
           placeholder="search"
           type="text">
    <span>{$searchText ? '❎' : '🔍'}</span>
</div>

<style lang="scss">
  div {
    display: flex;
    position: relative;
    align-items: center;
  }

  span {
    position: absolute;
    right: 11px;
    cursor: pointer;
    font-size: 14px;
  }

  .search {
    &Input {
      padding: 8px 16px;
      width: 180px;
      background-color: transparent;
      transition: transform 200ms ease-in-out;
      font-size: 12px;
      line-height: 12px;

      color: #575756;
      background-color: transparent;

      background-repeat: no-repeat;
      background-position: 95% center;
      border-radius: 50px;
      border: 1px solid #575756;
      transition: all 250ms ease-in-out;
      backface-visibility: hidden;
      transform-style: preserve-3d;

      &::placeholder {
        color: color(#575756 a(0.8));
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }

      &:hover,
      &:focus {
        outline: 0;
        border: 1px solid transparent;
        border-bottom: 1px solid #575756;
        border-radius: 0;
        background-position: 100% center;
      }
    }
  }
</style>