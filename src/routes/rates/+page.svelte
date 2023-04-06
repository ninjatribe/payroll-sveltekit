<script>
	// @ts-nocheck
	import Button from '$lib/components/reusable/Button.svelte';
	import { onMount } from 'svelte';
	import OvertimeTab from '$lib/components/forms/rates/OvertimeTab.svelte';
	import NightDifferenceTab from '$lib/components/forms/rates/NightDifferenceTab.svelte';
	import ConfigTab from '$lib/components/forms/rates/ConfigTab.svelte';

	let currentTab = 0;
	let item = {};
	let rates = {};
	let config = {};
	let isModalOpen = false;	

	const switchTabs = (tabIndex) => { currentTab = tabIndex };
	const closeModal = () => { isModalOpen = false };

	async function loadRates()
	{
		try {
			let response = await fetch('/api/admin/rates', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			let result = await response.json();
			item = result.response;
			rates = item.rates;
			config = item.config;
		} catch (error) {
			console.error('error', error);
		}
	}

	async function handleSaveRates(event)
	{
		event?.preventDefault();
		if(item._id === "")
			insertRates();
		else
			updateRates();
	}

	async function insertRates()
	{
		const response = await fetch('/api/admin/rates/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rates,
                config
			})
		});
		let result = await response.json();
		if (result.status === 'Success') {
            loadRates();
			console.log("Insert Success!");
		}
	}

	async function updateRates()
	{
		const _id = item._id;
		const response = await fetch('/api/admin/rates/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id,
				rates,
                config
			})
		});
		let result = await response.json();
		if (result.status === 'Success') {
            loadRates();
			isModalOpen = true;
			setTimeout(closeModal, 1000)
		}
	}

		onMount(async () => {
		loadRates();
	});
</script>

<div class="border-2 border-gray-100 rounded-lg h-auto dark:border-gray-700 mt-12">
	<div class="flex flex-col justify-center border-b h-fit rounded bg-blue-600 dark:bg-gray-800">
		<div class="flex flex-col px-5 justify-center py-4">
			<span class="text-xl font-semibold" style="color:white">Holiday and Restday Rates</span>
			<span class="text-m" style="color:white">Manage Holiday and Restday Rates</span>
		</div>
	</div>
	<div class="flex flex-col justify-center h-fit mb-1 rounded dark:bg-gray-800">
		<div class="ml-2 m-4 border-b border-gray-200 dark:border-gray-700">
			<ul class="flex flex-wrap -mb-px mb-0 text-sm font-semibold text-center text-gray-400" id="myTab">
				<li class="mr-2">
					<button on:click={() => switchTabs(0)} class="inline-block p-4 border-b-2 rounded-t-lg {(currentTab == 0) ? 'border-blue-600 text-blue-600':'border-transparent hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-300'}" id="rates-ot-tab" type="button">Rates (OT)</button>
				</li>
				<li class="mr-2">
					<button on:click={() => switchTabs(1)} class="inline-block p-4 border-b-2 rounded-t-lg {(currentTab == 1) ? 'border-blue-600 text-blue-600':'border-transparent hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-300'}" id="rates-nd-tab" type="button" >Rates (ND)</button>
				</li>
				<li class="mr-2">
					<button on:click={() => switchTabs(2)} class="inline-block p-4 border-b-2 rounded-t-lg {(currentTab == 2) ? 'border-blue-600 text-blue-600':'border-transparent hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-300'}" id="config-nd-tab" type="button" >Config (ND)</button>
				</li>
			</ul>
		</div>
		<div id="tab-contents">
			{#if currentTab == 0}
				<OvertimeTab bind:rates/>
			{:else if currentTab == 1}
				<NightDifferenceTab bind:rates/>
			{:else if currentTab == 2}
				<ConfigTab bind:config/>
			{/if}
		</div>
		<div class="ml-auto m-6 mt-0">
			<Button
				extraClasses="flex"
				textSize="m"
				bgColor="bg-blue-500"
				bgColorHover="bg-blue-700"
				textColor="text-white"
				on:click={handleSaveRates}
			>
				<svg fill="currentColor" class="w-5 h-5 mr-2 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path>
					<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path>
				</svg>
				Save
			</Button>
		</div>
	</div>
</div>
<div class="fixed z-10 inset-0 overflow-y-auto {(isModalOpen) ? 'opacity-100 pointer-events-auto' : 'transition-opacity opacity-0 pointer-events-none'}" on:click={closeModal} on:keypress={closeModal}>
	<div class="flex items-center justify-center min-h-screen">
		<div class="fixed inset-0 bg-gray-800 bg-opacity-25" />
        <div id="confirm-modal" tabindex="-1" class="fixed inset-0 z-50 w-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div class="relative w-full h-full max-w-md md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-green-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-semibold text-green-500 dark:text-gray-400">Rates saved successfully!</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
	.transition-opacity {
		transition-property: opacity;
		transition-duration: .8s;
	}
</style>