<script>
    // @ts-nocheck
    import { createEventDispatcher } from "svelte";
    export let isPrev = false;

    const dispatch = createEventDispatcher();
    
    function click(event) {
        dispatch('click', event);
    }
</script>
<button
    on:click={click}
    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
    {isPrev ? 'Prev' : 'Next'}
    <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
        <path
            fill-rule="evenodd"
            d="{
                isPrev 
                ? 'M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                : 'M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
            }"
            clip-rule="evenodd"
        />
    </svg>
</button>

