<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { paginate } from 'svelte-paginate';
	import AddLoanForm from '$lib/components/forms/loans/AddLoanForm.svelte';
	import EditLoanForm from '$lib/components/forms/loans/EditLoanForm.svelte';
	import ConfirmDeleteLoan from '$lib/components/forms/loans/ConfirmDeleteLoan.svelte';
	import Button from '$lib/components/reusable/Button.svelte';
	import SubLoanView from '$lib/components/forms/loans/SubLoanView.svelte';
	import Sort from "$lib/components/reusable/Sort.svelte";
	import PaginationButton from '$lib/components/reusable/PaginationButton.svelte';
	

	let status = 'all';
	let search;
	let isLoanFormOpen = false;
	let isEditLoanOpen = false;
	let isDeleteDataOpen = false;
	let isSubloanViewOpen =false;
	let isLoanViewOpen = false;
	let items = [];
	let currentPage = 1;
	let pageSize = 10;
	let itemSize;
	let paginatedItems = [];
	let currentLoan;
	let pageMinIndex = 1;
	let pageMaxIndex = pageSize;
	let sortOrder = 'asc';
	let sortBy = 'code';

	$: {
		// Prevent user to input below the minimum or beyond the maximum value of pagesize.
		if (pageSize < 1) pageSize = 1;
		// reactive statement to automatically filter data based on status.
		paginatedItems = search
			? items.filter((loan) => {
					return status !== 'all'
						? (loan.code.match(RegExp(search, 'gi')) ||
							loan.description.match(RegExp(search, 'gi'))) &&
							loan.isActive === (status === 'active')
						: loan.code.match(RegExp(search, 'gi')) ||
							loan.description.match(RegExp(search, 'gi'));
			  })
			: items.filter((loan) => {
					return status !== 'all' ? loan.isActive === (status === 'active') : items;
			  });
		if (paginatedItems.length) {
			itemSize = paginatedItems.length;
			paginatedItems = paginate({ items: paginatedItems, pageSize, currentPage });
		}
		pageMinIndex = paginatedItems.length == 0 ? 0 : 1 + (currentPage - 1) * pageSize;
		pageMaxIndex =
			pageSize * currentPage > itemSize ? paginatedItems.length : pageSize * currentPage;
	}



	const handleLoanFormModal = () => (isLoanFormOpen = !isLoanFormOpen);
	const handleEditLoanModal = () => (isEditLoanOpen = !isEditLoanOpen);
	const handleConfirmDeleteModal = () => (isDeleteDataOpen = !isDeleteDataOpen);
	const handleSubLoanViewModal = () => (isSubloanViewOpen = !isSubloanViewOpen);

	const handleOverFlow = () => {
		if (pageMinIndex > itemSize) currentPage = 1;
	};
	const decrementPageNumber = () => {
		if (currentPage > 1) currentPage -= 1;
	};
	const incrementPageNumber = () => {
		if (pageMaxIndex < itemSize) currentPage += 1;
	};

	function currentLoanExist() {
		if (currentLoan === undefined || !items.includes(currentLoan)) {
			log.error('Selected loan does not exist in items fetch from database!');
			return false;
		}
		if (loan.code === '' || loan.description === '') {
			return false;
		}
		return true;
	}

	async function loadLoan() {
		try {
			let response = await fetch('/api/admin/loan', {
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
		loadLoan();
	});
</script>

<div class="border-2 border-gray-100 overflow-x-auto rounded-lg h-auto dark:border-gray-700 mt-12">
	<div class="flex flex-col justify-center border-b h-fit rounded bg-blue-600 dark:bg-gray-800">
		<div class="flex flex-col px-5 justify-center py-4">
			<span class="text-xl font-semibold" style="color:white">Loan</span>
			<span class="text-m" style="color:white">Manage loans</span>
		</div>
		<div class="flex gap-4 h-auto px-5 py-5 bg-white dark:bg-gray-800">
			<div class="flex flex-col w-full h-auto ">
				<label
					for="status"
					class="block mb-2 pl-1 text-m font-semibold text-gray-900 dark:text-white">Status</label
				>
				<div class="grid grid-cols-5">
					<select
						id="status"
						bind:value={status}
						class=" bg-gray-50 border border-gray-300 font-semibold text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option class="text-gray-900 text-sm font-semibold" value="all" selected>All</option>
						<option class="text-green-600 text-sm font-semibold" value="active"> Active</option>
						<option class="text-red-500 text-sm font-semibold" value="inactive">Inactive</option>
					</select>
					<div class="flex ml-2">
						<Button
							extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-lg"
							textColor="text-white"
							hoverTitle="Apply Loan"
							textSize="text-sm"
							bgColor="bg-green-700"
							bgColorHover="bg-green-800"
							on:click={handleLoanFormModal}
							><svg
								style="color: white"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-file-earmark-plus-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"
									fill="white"
								/>
							</svg>
						</Button>
					</div>
					<div class="col-start-7 col-span-3 rounded ">
						<form class="flex items-center">
							<label for="search" class="sr-only">Search</label>
							<div class="relative w-full">
								<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										aria-hidden="true"
										class="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										><path
											fill-rule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clip-rule="evenodd"
										/></svg
									>
								</div>
								<input
									type="search"
									bind:value={search}
									id="search"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Search"
									required
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col items-center justify-center h-fit mb-1 rounded bg-gray-50 dark:bg-gray-800">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
			<thead class="text-m  text-gray-700 border-b bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="pl-6 py-3">
						CODE
						<Sort on:click={() => handleSort('code')}/>
					</th>
					<th scope="col" class="pl-6 py-3">
						DESCRIPTION
						<Sort on:click={() => handleSort('description')} />
					</th>
					<th scope="col" class="pl-6 py-3">
						COMMENTS
						<Sort on:click={() => handleSort('comments')} />
					</th>
					<th scope="col" class="pl-6 py-3">
						STATUS		
					</th>
					<th scope="col" class="pl-6 py-3">
						<div class="flex items-center justify-end ">
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
						{#each paginatedItems as loan}
							<tr
								class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								on:mouseenter={() => {
									if (currentLoan !== loan) {
										currentLoan = loan;
									}
								}}
							>
								<td
									class="px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white text-m font-medium"
								>
									{loan.code || ''}
								</td>
								<td class="px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white text-m font-medium">
									{loan.description || ''}
								</td>
								<td class="px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white text-m font-medium">
									{loan.comments || ''}
								</td>
								<td class="flex items-center px-6 py-4">
									<div class="flex items-center ">
										<div
											class={loan.isActive
												? 'h-2.5 w-2.5 rounded-full bg-green-500 mr-2'
												: 'h-2.5 w-2.5 rounded-full bg-red-500 mr-2'}
										/>
										<div class="text-sm text-gray-700 font-medium">
											{loan.isActive ? 'Active' : 'Inactive'}
										</div>
									</div>
								</td>
								<td class="px-2 py-4 col-span-3">
									<Button
										extraClasses="mx-1 pr-2 pl-4 inline-flex items-center text-center font-semibold rounded-full"
										textSize="text-m"
										hoverTitle="View"
										textColor="text-white"
										bgColor="bg-yellow-700"
										bgColorHover="bg-yellow-800"
										on:click={handleSubLoanViewModal}
										
									>
										<svg
											class="w-5 h-5 mr-2 dark:text-gray-400"
											xmlns="http://www.w3.org/2000/svg" 
											fill="None" 
											viewBox="0 0 24 24" 
											stroke-width="1.5" 
											stroke="currentColor"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
											/>
											<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
									  </svg></Button
									>
									<Button
										extraClasses="mx-1 pr-2 pl-4 inline-flex items-center text-center font-semibold rounded-full"
										textSize="text-m"
										hoverTitle="Edit"
										textColor="text-white"
										bgColor="bg-blue-700"
										bgColorHover="bg-blue-800"
										on:click={handleEditLoanModal}
										
									>
										<svg
											class="w-5 h-5 mr-2 dark:text-gray-400"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
											/>
											<path
												d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
											/>
										</svg></Button
									>
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
		</table>
		<div class="flex flex-col items-center mt-2">
			<span class="text-sm text-gray-700 dark:text-gray-400">
				Showing <span class="font-semibold text-gray-900 dark:text-white">{pageMinIndex}</span> to
				<span class="font-semibold text-gray-900 dark:text-white">{pageMaxIndex}</span>
				of <span class="font-semibold text-gray-900 dark:text-white">{itemSize}</span> Entries
			</span>
			<div class="inline-flex mt-2 xs:mt-0">
				<PaginationButton isPrev={true} on:click={decrementPageNumber}/>
				<PaginationButton on:click={incrementPageNumber}/>
			</div>
		</div>
	</div>
</div>
{#if isLoanFormOpen}
	<AddLoanForm title={'Apply Loan'} bind:isLoanFormOpen {loadLoan} />
{/if}
{#if isSubloanViewOpen}
	<SubLoanView title={currentLoan.code} bind:isSubloanViewOpen {loadLoan} />
{/if}

{#if currentLoanExist}
	{#if isEditLoanOpen}
		<EditLoanForm title={'Edit Loan'} bind:isEditLoanOpen bind:currentLoan {loadLoan} />
	{/if}
	{#if isDeleteDataOpen}
		<ConfirmDeleteLoan bind:isDeleteDataOpen bind:currentLoan {loadLoan} />
	{/if}
{/if}
