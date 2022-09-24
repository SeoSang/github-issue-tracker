<script>
	// 외부 모듈 수정해서 사용함.
	// @see https://svelte.dev/repl/c4fbeea94855451ebed2f86d4b61572e?version=3.38.2

	import { v4 as uuid } from '@lukeed/uuid'
	import { onMount, tick } from 'svelte'
	import { options } from "./store";
	import { OPTION_PIN_COLOR, OPTION_READ_COLOR } from '../../type/constant'
	import {HistoryType} from '../../type/enum'
	import { writable } from 'svelte/store'

	export let id = uuid()
	export let type = HistoryType.NONE_READ

	const selectedColor = writable('#FFFFFF')
	
	onMount(() => {
		$selectedColor = type === HistoryType.READ ? $options.readColor : $options.pinColor
	})

	selectedColor.subscribe((_selectedColor) => {
		if (_selectedColor === '#FFFFFF') return
		if (type === HistoryType.READ) {
			$options.readColor = _selectedColor
		}
		if (type === HistoryType.PINNED) {
			$options.pinColor = _selectedColor
		}
	})
	
	let top
	let windowHeight
	let ddActive = false
	let trigger = 'Escape'
	let ddHeight = 158
	// ddHeight is initially undefined so we can't get the correct values from binding; that's why we have a default
	let inputHeight

	// Our color set
	let values = [
		['#f9bec7', '#DAAFE9', '#C7DBF5', '#AAD5FB', OPTION_READ_COLOR, '#B0EDC3', '#FDF0A4', '#F8D6A2'],
		['#ff7096', '#C47ADA', '#90BAEE', '#75BAFA', '#72D5BF', '#73DE8C', '#FBE66E', '#F5B969'],
		[OPTION_PIN_COLOR, '#AE44B7', '#5E7ABC', '#5E7ABC', '#4DACA9', '#63B75A', '#EDBD4A', '#EC9740'],
		['#ff0000', '#501B87', '#021B6B', '#0C2794', '#337277', '#2F6A52', '#AE802F', '#AD6127']
    ]
	
	const handleKeydown = (e) => {
		if (e.key == trigger) {
		  ddActive = false;
		}
	}

	const toggleDropdown = async (e) => {
		top = (e.clientY + inputHeight) >= ddHeight && (windowHeight - ddHeight - inputHeight - e.clientY) <= 0
		ddActive = !ddActive
		await tick();
	}
	
	const clickOutsideDropdown = () => {
		ddActive = false;
	}

	const changeValue = (innerValue) => {
		ddActive = false;
		$selectedColor = innerValue
	}
	
	const keyboardGridNav = (e) => {
		const focussedElement 	= document.activeElement.id
		
		let myRow = parseInt(focussedElement.charAt(focussedElement.length-3))
		let myIndex = parseInt(focussedElement.charAt(focussedElement.length-1))
		let nextRow, prevRow, nextIndex, prevIndex
		
		switch(e.keyCode) {
		// left arrow
		case 37: 
			prevIndex = myIndex-1
			myIndex - 1 > -1 && document.getElementById(id+'-'+myRow+'-'+prevIndex).focus()
			break
		case 38: // top arrow
			prevRow = myRow-1
			prevRow > -1 && document.getElementById(id+'-'+prevRow+'-'+myIndex).focus()
			break
		case 39: // right arrow
			nextIndex = myIndex+1
			nextIndex < values[0].length && document.getElementById(id+'-'+myRow+'-'+nextIndex).focus()
			break
		case 40: // down arrow
			nextRow = myRow+1
			if (nextRow < values.length) {
				document.getElementById(id+'-'+nextRow+'-'+myIndex).focus()
			}
			break          
		}
	}
</script>

<svelte:window bind:innerHeight={windowHeight} on:keydown={handleKeydown} />

<div class="color-picker-holder">
	<div class="color-picker-inner"  >
		<button bind:clientHeight={inputHeight} class="select-color" on:click|preventDefault={(e) => toggleDropdown(e)} class:fake-focus={ddActive}>
			<div style="display: flex;">
				<div style="background: {$selectedColor};" class="color-block"></div>
				<div class="caret" class:top={top} style="margin-right: .2rem;"></div>
			</div>
		</button>
		<input type="text" bind:value={$selectedColor}>
	</div>
	
	{#if ddActive}
	<div class:top={top} bind:clientHeight={ddHeight} class="values-dropdown" on:click_outside={clickOutsideDropdown}>
		<div class="values-dropdown-grid">
		{#each values as val, index}
			{#each val as innerValue, innerIndex}
				<button
					id="{id}-{index}-{innerIndex}"
					class:active={innerValue === $selectedColor}
					on:keydown={(e) => keyboardGridNav(e,  innerIndex)}
					style="background: {innerValue};"
					on:click={() => { changeValue(innerValue) }}
					class="color-block">
				</button>
			{/each}
		{/each}
		</div>
	</div>
	{/if}
</div>


<style>
	
	.color-picker-holder {
		position: relative;
	}
	
	.color-picker-inner {
		display: flex;
		height: 35px;
	}
	
	.select-color {
		border: 1px solid #CCC;
		padding: 3px;
		border-radius: .2rem;
		margin-right: .4rem;
		background: #FFF;
		height: 35px;
	}
	
	.caret {
	  width: 0; 
	  height: 0; 
	  border-left: 4px solid transparent;
	  border-right: 4px solid transparent;
	  border-top: 4px solid #555;
		position: relative;
		top: 10px;
		margin-left: 4px;
	}	

	.caret.top {
	  border-left: 4px solid transparent;
	  border-right: 4px solid transparent;
	  border-bottom: 4px solid #555;
		border-top: none;
	}
	
	.active {
		box-shadow: inset 0 0 0 1px #FFF, 0 0 3px 1px rgba(0,0,0,0.25);
	}
	
	.fake-focus, input:focus, button:focus  {
		outline: 0;
		box-shadow: 0 0 0 2px #18A0FB;
		border-color: #18A0FB;
	}
	
	input {
		border: 1px solid #CCC;
		height: 35px;
		border-radius: .2rem;
	}
	
	.color-block {
		border-radius: .2rem; width: 24px; height: 24px; line-height: 0; font-size: 0;
	}
	
	.values-dropdown {
		padding: 1rem;
		position: absolute;
		z-index: 1;
		top: 40px;
		background: white;
		border: 1px solid #CCC;
		border-radius: .3rem;
	}
	
	.values-dropdown-grid {
		grid-template-columns: repeat(8, 24px);
		grid-template-rows: 24px 24px;
		grid-gap: 10px;
		display: grid;
	}
	
	.values-dropdown.top {
		top: auto;
		bottom: 40px;
	}
	
	.values-dropdown button {
		border: none;
	}
	
</style>