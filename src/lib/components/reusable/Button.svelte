<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	export let type = 'button';
	export let hoverTitle = '';
	export let extraClasses = '';
	export let textSize = 'text-sm';
	export let textColor = 'text-neutral-500';
	export let textColorHover = 'text-white';
	export let bgColor = 'bg-white';
	export let bgColorHover = 'bg-blue-500';
	export let borderColor = 'border-neutral-500';
	export let borderColorHover = 'border-blue-500';

	const dispatch = createEventDispatcher();

	function click(event) {
		dispatch('click', event.detail);
	}
</script>

<button
	{type}
	class="{extraClasses} {textColor} {bgColor} {borderColor} {textSize} inline-block rounded border px-6 pt-2 pb-[6px] font-medium uppercase leading-normal transition duration-150 ease-in-out hover:{borderColorHover} hover:{bgColorHover} hover:bg-opacity-100 hover:{textColorHover} focus:{borderColorHover} focus:{textColorHover} focus:outline-none focus:ring-0 active:{borderColorHover} active:{textColorHover} dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
	title={hoverTitle}
	data-te-ripple-init
	data-te-ripple-color="light"
	on:click={click}
>
	<slot />
</button>
