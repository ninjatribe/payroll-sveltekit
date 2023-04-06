<script>
    // @ts-nocheck
    import Button from '$lib/components/reusable/Button.svelte';
    import {onMount} from 'svelte';
    
    // export let item;
    export let rates;

    let ndRates = {};
    const ND_RATE = .1;

    function getNightDiff(rates)
    {
        if(rates === undefined)
            console.error("ERROR: rates param is undefined!");
        return {
            regular: computeNightDiff(rates.regular),
            regularOvertime: computeNightDiff(rates.regularOvertime),
            shOrdOvertime: computeNightDiff(rates.shOrdOvertime),
            shOrdOvertimeExcess: computeNightDiff(rates.shOrdOvertimeExcess),
            shArdOvertime: computeNightDiff(rates.shArdOvertime),
            shArdOvertimeExcess: computeNightDiff(rates.shArdOvertimeExcess),
            legalHoliday: computeNightDiff(rates.legalHoliday),
            legalHolidayOvertimeExcess: computeNightDiff(rates.legalHolidayOvertimeExcess),
            legalHolidayRD: computeNightDiff(rates.legalHolidayRD),
            legalHolidayRDOvertimeExcess: computeNightDiff(rates.legalHolidayRDOvertimeExcess),
        }
    }

    const computeNightDiff = (value) => {return parseFloat((value * ND_RATE).toFixed(3))};
    const recomputeRate = (value) => {return parseFloat((value / ND_RATE).toFixed(3))};

    onMount(()=>{
        ndRates = getNightDiff(rates);
    });
</script>
<div class="grid grid-cols-4 grid-rows-3 rounded-lg dark:bg-gray-800" id="rates-nd">
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                type="number" 
                id="nd-regular" 
                class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  
                bind:value={ndRates.regular}
                on:change={rates.regular = recomputeRate(ndRates.regular)}
            />
            <label for="nd-regular" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Regular</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{ndRates.regular = 0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-regular-ovetime" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.regularOvertime}
                    on:change={rates.regularOvertime = recomputeRate(ndRates.regularOvertime)}
                />
                <label for="nd-regular-ovetime" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Regular Overtime</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.regularOve0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-sh-rd-overtime" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.shOrdOvertime}
                    on:change={rates.regularOvertime = recomputeRate(ndRates.regularOvertime)}
                />
                <label for="nd-sh-rd-overtime" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH/RD Overtime</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.shOrdOvert0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-sh-rd-ot-excess" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.shOrdOvertimeExcess}
                    on:change={rates.shOrdOvertimeExcess = recomputeRate(ndRates.shOrdOvertimeExcess)}
                />
                <label for="nd-sh-rd-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH/RD OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.shOrdOvert0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-sh-rd-overtime" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.shArdOvertime}
                    on:change={rates.shArdOvertime = recomputeRate(ndRates.shArdOvertime)}
                />
                <label for="nd-sh-rd-overtime" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH&RD Overtime</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.shArdOvert0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-sh-rd-ot-excess" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.shArdOvertimeExcess}
                    on:change={rates.shArdOvertimeExcess = recomputeRate(ndRates.shArdOvertimeExcess)}
                />
                <label for="nd-sh-rd-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH&RD OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.shArdOvert0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-legal-holiday" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.legalHoliday}
                    on:change={rates.legalHoliday = recomputeRate(ndRates.legalHoliday)}
                />
                <label for="nd-legal-holiday" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.legalHolid0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-legal-holiday-ot-excess" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.legalHolidayOvertimeExcess}
                    on:change={rates.legalHolidayOvertimeExcess = recomputeRate(ndRates.legalHolidayOvertimeExcess)}
                />
                <label for="nd-legal-holiday-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.legalHolid0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="legal-" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.legalHolidayRD}
                    on:change={rates.legalHolidayRD = recomputeRate(ndRates.legalHolidayRD)}
                />
                <label for="legal-" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday & RD</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.legalHolid0}}
            >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10">
        <div class="relative">
            <input 
                    type="number" 
                    id="nd-legal-holiday-rd-ot-excess" 
                    class="block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    bind:value={ndRates.legalHolidayRDOvertimeExcess}
                    on:change={rates.legalHolidayRDOvertimeExcess = recomputeRate(ndRates.legalHolidayRDOvertimeExcess)}
                />
                <label for="nd-legal-holiday-rd-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday & RD OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.ndRates.legalHolid0}}
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