<script>
    // @ts-nocheck
	import Button from "$lib/components/reusable/Button.svelte";
    export let rates = {};
    
</script>

<div class="grid grid-cols-4 grid-rows-3 h-max rounded-lg dark:bg-gray-800" id="rates-ot">
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-regular" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.regular}
            />
            <label for="ot-regular" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Regular</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.regular = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-regular-ovetime" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.regularOvertime}
            />
            <label for="ot-regular-ovetime" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Regular Overtime</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.regularOvertime = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-sh-rd-overtime"
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.shOrdOvertime}
            />
            <label for="ot-sh-rd-overtime" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH/RD Overtime</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.shOrdOvertime = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-sh-rd-ot-excess" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.shOrdOvertimeExcess}
            />
            <label for="ot-sh-rd-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH/RD OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.shOrdOvertimeExcess = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-sh-rd-overtime"
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.shArdOvertime}
            />
            <label for="ot-sh-rd-overtime" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH&RD Overtime</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.shArdOvertime = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-sh-rd-ot-excess" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.shArdOvertimeExcess}
            />
            <label for="ot-sh-rd-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">SH&RD OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.shArdOvertimeExcess = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-legal-holiday" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.legalHoliday}
            />
            <label for="ot-legal-holiday" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.legalHoliday = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-legal-holiday-ot-excess" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.legalHolidayOvertimeExcess}
            />
            <label for="ot-legal-holiday-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.legalHolidayOvertimeExcess = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="legal-" 
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.legalHolidayRD}
            />
            <label for="legal-" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday & RD</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.legalHolidayRD = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
    <div class="mx-6 mb-10 ">
        <div class="relative">
            <input 
                type="number" 
                id="ot-legal-holiday-rd-ot-excess"
                class="appearance-none block pt-9 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                bind:value={rates.legalHolidayRDOvertimeExcess}
            />
            <label for="ot-legal-holiday-rd-ot-excess" class="pt-1 absolute top-0 left-0 text-sm text-gray-600 font-semibold dark:text-gray-400 peer-focus:text-blue-600">Legal Holiday & RD OT Excess</label>
            <Button
                extraClasses="hidden pl-1 pr-1 rounded-lg absolute bottom-0 right-0 border-0 peer-focus:block hover:block"
                bgColor="transparent"
                borderColorHover="transparent"
                borderColor="transparent"
                textColor="text-blue-500"
                on:click={()=>{rates.legalHolidayRDOvertimeExcess = 0}}
                >
                <svg class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </Button>
        </div>
    </div>
</div>

<!-- Return -->
<!-- <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> -->
    <!-- <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path> -->
<!-- </svg> -->
<!-- xmark -->
<!-- <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg> -->
<style>
    /* Removes Arrows in Number input fields */
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
    }
</style>