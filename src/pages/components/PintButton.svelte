<script lang="ts">
    import classNames from 'classnames'

    export let isPinned
    export let onClick
</script>

<div class={classNames('pin', {pinned: isPinned})} on:click|stopPropagation={onClick}>
    📌
</div>

<style lang="scss">
  .pin {
    display: flex;
    padding: 3px;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin: 3px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background: rgba(11, 14, 9, 0.14);
    }

    &.pinned {
      background: #ff9797;
    }
  }
</style>

