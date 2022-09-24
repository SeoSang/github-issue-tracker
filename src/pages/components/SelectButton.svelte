<script lang="ts">
    import {selectedOrg, selectedRepo} from "../../store/svelte";

    export let text
    export let type
    export let options
    let isModalOpen = false

    const onClickOption = (option: string) => () => {
        if (type === 'repo') {
            $selectedRepo = option
        }
        if (type === 'org') {
            $selectedOrg = option
        }
        isModalOpen = false
    }

</script>

<div class="select-button" on:click={() => {$: isModalOpen = true}}>
    <p>{text}</p>
    <span>⬇</span>
    {#if isModalOpen}
        <div class="select-container">
            <div on:click|stopPropagation={() => {
              $: isModalOpen = false
            }}>
                <span>⬆️</span>
            </div>
            {#if (options.length > 0)}
                <p on:click|stopPropagation={onClickOption('')}>전체보기</p>
                {#each options as option}
                    <p on:click|stopPropagation={onClickOption(option)}>{option}</p>
                {/each}
            {:else}
                <p on:click|stopPropagation={onClickOption('')}>정보없음</p>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
  .select-button {
    display: flex;
    position: relative;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    width: 108px;
    font-family: inherit;
    padding: 5px 10px;
    height: 28px;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(23, 19, 19, 0.29);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 1px 2px rgba(0, 5, 30, 0.2), 0 4px 8px -2px rgba(0, 5, 30, 0.15),
    0 10px 16px -4px rgba(0, 5, 30, 0.05), rgba(255, 255, 255, 0.1);
  }

  p {
    margin: 0;
    overflow: hidden;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    font-size: 13px;
    white-space: nowrap;
  }

  .select-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .select-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 2px;
    background: rgba(23, 19, 19, 0.8);
    width: 108px;
    margin: 0;
    box-sizing: border-box;
    list-style-type: none;
    overflow-y: auto;
    border-radius: 8px;
    padding: 0 8px 0px 8px;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.25);
    z-index: 200;

    div {
      display: flex;
      padding-top: 6px;
      flex-direction: row-reverse;
      z-index: 201;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #7F7F7F;
      }
    }


    p {
      padding: 5px;
      font-size: 11px;

      &:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }


</style>