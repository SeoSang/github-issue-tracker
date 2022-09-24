<script lang="ts">
    import OptionForm from "./OptionForm.svelte";
</script>

<div class="container">
    <h1>Github-Issue-Tracker Options ⌥</h1>
    <h2>Options</h2>
    <OptionForm/>
    <div class="warning">
        <h2>Warning ⚠</h2>
        <p class="info">Only predetermined options can be edited.

            Any addition of new key values will be ignored.</p>
    </div>
</div>


<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }

  .warning {
    background-color: #ffffcc;
    margin: 16px 0;
    border: rgb(204, 204, 204) solid 1px;
    padding: 16px;

    .info {
      white-space: pre-line;
    }
  }
</style>