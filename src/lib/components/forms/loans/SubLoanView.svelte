<script>
	// @ts-nocheck
	export let title;
	export let isSubloanViewOpen = false;
	import Button from '$lib/components/reusable/Button.svelte';
    import { onMount } from 'svelte';
	import { paginate } from 'svelte-paginate';
    import SubLoanDelete from './SubLoanDelete.svelte';
    import Sort from "$lib/components/reusable/Sort.svelte";


	let code = '',
		description = '',
		period = ''

    let status = 'all';
    let items = [];
	let currentPage = 1;
	let pageSize = 10;
	let itemSize;
	let paginatedItems = [];
    let isDeleteDataOpen = false;
	let currentsubLoan;
	let pageMinIndex = 1;
	let pageMaxIndex = pageSize;
	let sortOrder = 'asc';
	let sortBy = 'code';

    $: {
		// Prevent user to input below the minimum or beyond the maximum value of pagesize.
		if (pageSize < 1) pageSize = 1;
		// reactive statement to automatically filter data based on status.
		paginatedItems = search
			? items.filter((subloan) => {
					return status !== 'all'
						? (subloan.code.match(RegExp(search, 'gi')) ||
							subloan.description.match(RegExp(search, 'gi'))) &&
							subloan.isActive === (status === 'active')
						: subloan.code.match(RegExp(search, 'gi')) ||
							subloan.description.match(RegExp(search, 'gi'));
			  })
			: items.filter((subloan) => {
					return status !== 'all' ? subloan.isActive === (status === 'active') : items;
			  });
		if (paginatedItems.length) {
			itemSize = paginatedItems.length;
			paginatedItems = paginate({ items: paginatedItems, pageSize, currentPage });
		}
		pageMinIndex = paginatedItems.length == 0 ? 0 : 1 + (currentPage - 1) * pageSize;
		pageMaxIndex =
			pageSize * currentPage > itemSize ? paginatedItems.length : pageSize * currentPage;
	}

    const handleConfirmDeleteModal = () => (isDeleteDataOpen = !isDeleteDataOpen);

    const handleOverFlow = () => {
		if (pageMinIndex > itemSize) currentPage = 1;
	};
	const decrementPageNumber = () => {
		if (currentPage > 1) currentPage -= 1;
	};
	const incrementPageNumber = () => {
		if (pageMaxIndex < itemSize) currentPage += 1;
	};

    function toggleLoanForm() {
		isSubloanViewOpen = !isSubloanViewOpen;
	}

    function currentsubLoanExist() {
		if (currentsubLoan === undefined || !items.includes(currentsubLoan)) {
			log.error('Selected loan does not exist in items fetch from database!');
			return false;
		}
		if (subloan.code === '' || subloan.description === '') {
			return false;
		}
		return true;
	}

	async function handleSubmit(event) {
		event?.preventDefault();
		const response = await fetch('/api/admin/subloan/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				description,
				period
			})
		});
		const result = await response.json();
		if (result.error) {
			error = alert(result.errorMessage) || 'An error occured';
		} else {
			isSubloanViewOpen = false;
		}
		if (result.status === 'Success') {
			loadSubloan();
		}
	}


	async function loadSubloan() {
		try {
			let response = await fetch('/api/admin/subloan', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			let result = await response.json();
			items = result.response;
			sortItems();
		} catch (error) {
			console.error('error', error);
		}
	}

	function sortItems() {
		let order = sortOrder === 'asc' ? 1 : -1;
		items = items.sort((a, b) => {
			if (a[sortBy] < b[sortBy]) return -1 * order;
			if (a[sortBy] > b[sortBy]) return 1 * order;
			return 0;
		});
	}

	function handleSort(columnName) {
		if (columnName === sortBy) {
			sortOrder = sortOrder === 'asc' ? 'des' : 'asc';
			console.warn(sortOrder);
		} else {
			sortBy = columnName;
		}
		sortItems();
	}

	onMount(async () => {
		loadSubloan();
	});
</script>

<div class="fixed z-10 inset-0 overflow-y-auto {isSubloanViewOpen ? 'block' : 'hidden'}">
	<div class="flex items-center justify-center min-h-screen ">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 " />
		<div
			class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-7xl w-full mx-auto"
			role="dialog"
			aria-modal="true"

			aria-labelledby="modal-headline"
		>
        <div class="border-2 border-gray-100 overflow-x-auto rounded-lg h-auto dark:border-gray-700 mt-12">
            <div class="flex flex-col justify-center border-b h-fit rounded bg-blue-600 dark:bg-gray-800">
                <div class="flex flex-col px-5 justify-center py-4">
                    <span class="text-xl font-semibold" style="color:white">{title}</span>
                    <span class="text-m" style="color:white">Manage Sub loans</span>
                </div>
                <div class="flex gap-4 h-auto px-2 py-2 bg-white dark:bg-gray-800">
                    <div class="flex flex-col w-full h-auto ">
					<form class="grid grid-cols-4" on:submit={handleSubmit}>
						<div class="py-2 px-2">
							<input
								type="text"
								id="codes"
								name="codes"
								bind:value={code}
                                placeholder="Code"
								class="w-full px-3 py-2 h-10 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							/>
						</div>
                        <div class="py-2 px-2 col-span-2">
                            <input
                                type="text"
                                id="description"
                                name="description"
                                bind:value={description}
                                placeholder="Description"
                                class="w-full px-3 py-2 h-10 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div class="mb-4 py-2 px-2 col-start-4">
                            <select
                                id="period"
                                name="period"
                                bind:value={period}
                                class="w-full px-3 py-2 h-10 text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline class:active:bg-gray-100 class:focus:outline-none class:focus:bg-gray-100"
                            >
                                <option value="" disabled selected>Select the type</option>
                                <option value="1st Period">1st Period</option>
                                <option value="2nd Period">2nd Period</option>
                                <option value="3rd Period">3rd Period</option>
                            </select>
                        </div>
                        <div class="col-start-7 col-span-4 rounded py-3">
                            <Button
									type="submit"
									extraClasses="col-start-3 mx-2 pr-2 pl-2 inline-flex items-center text-center font-semibold rounded-lg"
									textSize="text-xs"
									textColor="text-white"
									bgColor="bg-blue-700"
									bgColorHover="bg-blue-800"
								>
									<svg
										class="w-5 h-5 mr-1 dark:text-gray-400"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										viewBox="0 0 24 24"
										aria-hidden="true"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 4.5v15m7.5-7.5h-15"
										/></svg
									>
									Submit
								</Button>
                        </div>
                        

                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-center h-fit mb-1 rounded bg-gray-50 dark:bg-gray-800">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                        <thead class="text-m  text-gray-700 border-b bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="pl-6">
                                    CODE
                                    <Sort on:click={() => handleSort('code')}/>
                                </th>
                                <th scope="col" class="pl-6">
                                    DESCRIPTION
                                    <Sort on:click={() => handleSort('description')} />
                                </th>
                                <th scope="col" class="pl-6">
                                    PERIOD
                                    <Sort on:click={() => handleSort('period')} />
                                </th>
                                <th scope="col" class="pl-6">
                                    STATUS		
                                </th>
                                <th scope="col" class="pl-6">
                                    ACTION	
                                </th>
                                <th scope="col" class="pl-6">
                                    <div class="flex gap-2 w-max">
                                        <label for="items" class="block text-m font-semibold text-gray-900 dark:text-white"
                                            >No. of Entries</label
                                        >
                                        <input
                                            type="number"
                                            id="items"
                                            bind:value={pageSize}
                                            on:change={handleOverFlow}
                                            class="w-16 h-4 text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                                            placeholder=" "
                                        />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#key paginatedItems}
                                {#if paginatedItems.length}
                                    {#each paginatedItems as subloan}
                                        <tr
                                            class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            on:mouseenter={() => {
                                                if (currentsubLoan !== subloan) {
                                                    currentsubLoan = subloan;
                                                }
                                            }}
                                        >
                                            <td
                                                class="px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white text-m font-medium"
                                            >
                                                {subloan.code || ''}
                                            </td>
                                            <td class="px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white text-m font-medium">
                                                {subloan.description || ''}
                                            </td>
                                            <td class="px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white text-m font-medium">
                                                {subloan.period || ''}
                                            </td>
                                            <td class="flex items-center px-6 py-4">
                                                <div class="flex items-center ">
                                                    <div
                                                        class={subloan.isActive
                                                            ? 'h-2.5 w-2.5 rounded-full bg-green-500 mr-2'
                                                            : 'h-2.5 w-2.5 rounded-full bg-red-500 mr-2'}
                                                    />
                                                    <div class="text-sm text-gray-700 font-medium">
                                                        {subloan.isActive ? 'Active' : 'Inactive'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-2 py-4 col-span-3">
                                                <Button
                                                    extraClasses="mx-1 pr-2 pl-4 inline-flex items-center text-center font-semibold rounded-full"
                                                    textSize="text-m"
                                                    hoverTitle="Delete"
                                                    textColor="text-white"
                                                    bgColor="bg-red-600"
                                                    bgColorHover="bg-red-700"
                                                    on:click={handleConfirmDeleteModal}
                                                    
                                                >
                                                    <svg
                                                        class="w-5 h-5 mr-2 dark:text-gray-400 "
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            clip-rule="evenodd"
                                                            fill-rule="evenodd"
                                                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                        />
                                                    </svg>
                                                </Button>
                                            </td>
                                        </tr>
                                    {/each}
                                {/if}
                            {/key}
                        </tbody>
                        <div class="flex flex-col items-center mt-2">
                            <span class="text-sm text-gray-700 dark:text-gray-400">
                                Showing <span class="font-semibold text-gray-900 dark:text-white">{pageMinIndex}</span> to
                                <span class="font-semibold text-gray-900 dark:text-white">{pageMaxIndex}</span>
                                of <span class="font-semibold text-gray-900 dark:text-white">{itemSize}</span> Entries
                            </span>
                            <div class="inline-flex mt-2 xs:mt-0">
                                <button
                                    on:click={decrementPageNumber}
                                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    Prev
                                </button>
                                <button
                                    on:click={incrementPageNumber}
                                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Next
                                    <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <div class="p-2 bg-gray-100 text-right">
                                    <button
                                        type="button"
                                        class="flex items-end px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        on:click={toggleLoanForm}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </table>
                </div>
            </div>
		</div>
	</div>
</div>
{#if currentsubLoanExist}

	{#if isDeleteDataOpen}
		<SubLoanDelete bind:isDeleteDataOpen bind:currentsubLoan {loadSubloan} />
	{/if}
{/if}


