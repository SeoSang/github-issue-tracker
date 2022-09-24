<script lang="ts">
    import ColorPicker from "./ColorPicker.svelte";
    import {options, restaurant_store} from "./store";
    import type {OptionInfo} from "../../type/options";
    import {optionStorage} from "../../store/option/storage";
    import {onMount} from "svelte";
    import {isColor} from "../../lib/color";
    import {HistoryType} from '../../type/enum'

    let errors: { [key in OptionInfo]: boolean } = {
        url: false,
        maxIssuesCount: false,
        maxPrsCount: false,
        readColor: false,
        pinColor: false,
    };


    let loading = true

    onMount(() => {
        restaurant_store.init().then(() => loading = false).catch((e) => console.error(e))
    })

    const isFormValid = (): boolean => {
        return Object.keys(errors).every((inputName) => !errors[inputName])
    }

    const validateUrl = (url: string) => {
        if (!url) {
            errors['url'] = 'url must not be empty!'
            return
        }
        const pattern_spc = /[~!@#$%^&*()_+|<>?{}]/;
        if (pattern_spc.test(url)) {
            errors['url'] = 'url value must not contain special characters!'
            return
        }
        errors['url'] = null
    }

    const validateMaxPrsCount = (maxPrsCount) => {
        if (!maxPrsCount) {
            errors['maxPrsCount'] = 'maxPrsCount must not be empty!'
            return
        }
        if (typeof maxPrsCount !== "number") {
            errors['maxPrsCount'] = 'maxPrsCount must be number!'
            return
        }
        if (maxPrsCount < 1 || maxPrsCount > 1000) {
            errors['maxPrsCount'] = 'maxPrsCount value must be 1 <= maxPrsCount <= 1000!'
            return
        }
        errors['maxPrsCount'] = null
    }

    const validateMaxIssuesCount = (maxIssuesCount) => {
        if (!maxIssuesCount) {
            errors['maxIssuesCount'] = 'maxIssuesCount must not be empty!'
            return
        }
        if (typeof maxIssuesCount !== "number") {
            errors['maxIssuesCount'] = 'maxIssuesCount must be number!'
            return
        }
        if (maxIssuesCount < 1 || maxIssuesCount > 1000) {
            errors['maxIssuesCount'] = 'maxIssuesCount value must be 1 <= maxPrsCount <= 1000!'
            return
        }
        errors['maxIssuesCount'] = null
    }

    const validateReadColor = (readColor) => {
        if (!isColor(readColor)) {
            errors['readColor'] = 'color must be RGB string!'
            return
        }
        errors['readColor'] = null
    }

    const validatePinColor = (pinColor) => {
        if (!isColor(pinColor)) {
            errors['pinColor'] = 'color must be RGB string!'
            return
        }
        errors['pinColor'] = null
    }

    const validateForm = () => {
        validateUrl($options.url)
        validateMaxIssuesCount($options.maxIssuesCount)
        validateMaxPrsCount($options.maxPrsCount)
        validateReadColor($options.readColor)
        validatePinColor($options.pinColor)
    }

    const onSubmit = async () => {
        validateForm();
        if (isFormValid()) {
            await optionStorage.save($options)
            alert(`Save Complete!\n ${JSON.stringify($options)}`)
            return
        }
        alert(errors['url'] || errors['maxIssuesCount'] || errors['maxPrsCount'] || errors['readColor'] || errors['pinColor']);
    }
</script>

<form class="content" on:submit|preventDefault={onSubmit}>
    {#if loading}
        <div>options loading..</div>
    {:else}
        <div class="valueContainer">
            <label for="url">URL</label>
            <input bind:value={$options.url} disabled id="url" name="url" type="text"/>
        </div>
        <p class="infoMessage">There is a functional problem, so it cannot be fixed for a while.</p>
        {#if errors.url}
            <p class="errorMessage">{errors.url}</p>
        {/if}
        <div class="valueContainer">
            <label for="maxIssuesCount">Maximum number of issues</label>
            <input bind:value={$options.maxIssuesCount} id="maxIssuesCount" name="maxIssuesCount" type="number"/>
        </div>
        {#if errors.maxIssuesCount}
            <p class="errorMessage">{errors.maxIssuesCount}</p>
        {/if}
        <div class="valueContainer">
            <label for="maxPrsCount">Maximum number of Prs</label>
            <input bind:value={$options.maxPrsCount} id="maxPrsCount" name="maxPrsCount" type="number"/>
        </div>
        {#if errors.maxPrsCount}
            <p class="errorMessage">{errors.maxPrsCount}</p>
        {/if}
        <div class="valueContainer">
            <span>Text-color of read-issue-title</span>
            <ColorPicker value={$options.readColor} type={HistoryType.READ}/>
        </div>
        {#if errors.readColor}
            <p class="errorMessage">{errors.readColor}</p>
        {/if}
        <div class="valueContainer">
            <span>Text-color of pinned-issue-title</span>
            <ColorPicker value={$options.pinColor} type={HistoryType.PINNED}/>
        </div>
        {#if errors.pinColor}
            <p class="errorMessage">{errors.pinColor}</p>
        {/if}
        <button class="submitButton" type="submit">Submit</button>
    {/if}
</form>

<style lang="scss">
  .valueContainer {
    display: grid;
    width: 100%;
    grid-template-columns: 30% 70%;
    grid-column-gap: 10px;
    padding: 3px;
    margin: 0.5rem;
    align-items: center;

    label {
      font-size: 0.8rem;
    }
  }

  .content {
    display: flex;
    width: 90%;
    flex-direction: column;
    align-items: center;
    //grid-template-columns: 20% 80%;
    //grid-column-gap: 10px;
  }

  .errorMessage {
    color: red;
    padding: 0;
    margin: 0 0 3px;
  }

  .infoMessage {
    font-size: 0.8rem;
    color: gray;
    padding: 0;
    margin: 0 0 3px;
  }

  .submitButton {
    margin-top: 10px;
  }
</style>