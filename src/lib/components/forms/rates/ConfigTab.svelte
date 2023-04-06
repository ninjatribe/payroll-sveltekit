<script>
    // @ts-nocheck
    import Button from "$lib/components/reusable/Button.svelte";
    
    // export let item;
    export let config;
    
    function getTimeDiff()
    {
        const start = new Date(`2000-01-01T${config.timeStart}:00Z`);
        const end = new Date(`2000-01-01T${config.timeEnd}:00Z`);
        let diff = (end - start) / 1000 / 60 / 60; // difference in hours
        // Check for "negative" time difference
        return (diff < 0) ? diff += 24 : diff; 
    }

    function handleKeyDown(event) {
        // Prevent user to input floating number in input.
        if (event.key === '.') {
            event.preventDefault();
        }
    }

    function getMaxAllowedEndTime()
    {
        const start = config.timeStart;
        const duration = config.maxAllowedTime;
        const [hours, minutes] = start.split(':').map(Number);
        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);

        date.setHours(date.getHours() + duration);

        const newHours = String(date.getHours()).padStart(2, '0');
        const newMinutes = String(date.getMinutes()).padStart(2, '0');
        return `${newHours}:${newMinutes}`;
    }

    $:{ 
        // Prevents user to input time greater than the expected end time based on maximum allowed time 
        config.maxAllowedTime = (config.maxAllowedTime < 0) ? 0 : config.maxAllowedTime;
        config.timeEnd = (getTimeDiff() > config.maxAllowedTime)? getMaxAllowedEndTime(): config.timeEnd;
    }
</script>

<div class="grid grid-cols-3 rounded-lg dark:bg-gray-800" id="config-nd">
    <!-- Config (ND) Contents -->
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                type="time" 
                id="config-time-start" 
                class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={config.timeStart}
            />
            <label for="config-time-start" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Time Start</label>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                type="time" 
                id="config-time-end" 
                class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={config.timeEnd}
            />
            <label for="config-time-end" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Time End</label>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                type="number" 
                id="config-maximum-time-allowed" 
                class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={config.maxAllowedTime}
                on:keydown={handleKeyDown}
            />
            <label for="config-maximum-time-allowed" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Maximum Allowed Time (Hours)</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block  hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{config.maxAllowedTime = 1}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
</div>

<style>
    /* Removes Arrows in Number input fields */
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
    }
</style>
