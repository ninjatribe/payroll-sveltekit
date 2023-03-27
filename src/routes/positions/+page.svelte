<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { paginate } from 'svelte-paginate';
	import Button from '$lib/components/reusable/Button.svelte';
	import AddPositionForm from '$lib/components/forms/Positions/AddPositionForm.svelte';
	import EditPositionForm from '$lib/components/forms/Positions/EditPositionForm.svelte';
	import DeletePositionForm from '$lib/components/forms/Positions/DeletePositionForm.svelte';

	let status = 'all';
	let search;
	let addModalOpen = false;
	let editModalOpen = false;
	let deleteModalOpen = false;
	let items = [];
	let currentPage = 1;
	let pageSize = 5;
	let itemSize;
	let paginatedItems = [];
	let currentPosition;
	let pageMinIndex = 1;
	let pageMaxIndex = pageSize;
	let sortOrder = 'asc';
	let sortBy = 'code';

	$: {
		// Prevent user to input below the minimum or beyond the maximum value of pagesize.
		if (pageSize < 1) pageSize = 1;
		// reactive statement to automatically filter data based on status.
		paginatedItems = search
			? items.filter((position) => {
					return status !== 'all'
						? (position.code.match(RegExp(search, 'gi')) ||
								(position.postionTitle.match(RegExp(search, 'gi')) &&
									position.postionState.match(RegExp(search, 'gi')) &&
									position.salaryGrade.match(RegExp(search, 'gi')) &&
									position.payGradeSteps.match(RegExp(search, 'gi')))) &&
								position.status === (status === 'active')
						: position.code.match(RegExp(search, 'gi')) ||
								position.postionTitle.match(RegExp(search, 'gi'));
			  })
			: items.filter((position) => {
					return status !== 'all' ? position.status === (status === 'active') : items;
			  });
		if (paginatedItems.length) {
			itemSize = paginatedItems.length;
			paginatedItems = paginate({ items: paginatedItems, pageSize, currentPage });
		}
		pageMinIndex = 1 + (currentPage - 1) * pageSize;
		pageMaxIndex = pageSize * currentPage > itemSize ? itemSize : pageSize * currentPage;
	}

	const addPositionModal = () => (addModalOpen = !addModalOpen);
	const editPositionModal = () => (editModalOpen = !editModalOpen);
	const deletePositionModal = () => (deleteModalOpen = !deleteModalOpen);
	const handleOverFlow = () => {
		if (pageMinIndex > itemSize) currentPage = 1;
	};
	const decrementPageNumber = () => {
		if (currentPage > 1) currentPage -= 1;
	};
	const incrementPageNumber = () => {
		if (pageMaxIndex < itemSize) currentPage += 1;
	};

	function currentPostionExist() {
		if (currentPosition === undefined || !items.includes(currentPosition)) {
			log.error('The Position does not exist in items fetch from database!');
			return false;
		}
		if (position.code === '' || position.description === '') {
			return false;
		}
		return true;
	}

	async function loadPositions() {
		try {
			let response = await fetch('/api/admin/positions', {
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

	function sortColumn(columnName) {
		if (columnName === sortBy) {
			sortOrder = sortOrder === 'asc' ? 'des' : 'asc';
			console.warn(sortOrder);
		} else {
			sortBy = columnName;
		}
		sortItems();
	}

	onMount(async () => {
		loadPositions();
	});
</script>

<div class="border-2 border-gray-100 overflow-x-auto rounded-lg h-auto dark:border-gray-700 mt-12">
	<div class="flex flex-col justify-center border-b h-fit rounded bg-yellow-300 dark:bg-gray-800">
		<div class="flex flex-col px-5 justify-center py-4">
			<span class="text-xl font-semibold dark:text-white text-gray-900 ">Positions</span>
			<span class="text-m text-gray-600 dark:text-gray-400">Manage Positions</span>
		</div>
		<div class="flex gap-4 h-auto px-5 py-5 bg-white dark:bg-gray-800">
			<div class="flex flex-col w-full h-auto ">
				<label
					for="status"
					class="block mb-2 pl-1 text-m font-semibold text-gray-900 dark:text-white">Status</label
				>
				<div class="grid grid-cols-9">
					<select
						id="status"
						bind:value={status}
						class=" bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option class="text-gray-900 text-sm font-semibold" value="all" selected>All</option>
						<option class="text-green-600 text-sm font-semibold" value="active"> Active</option>
						<option class="text-red-500 text-sm font-semibold" value="inactive">Inactive</option>
					</select>
					<div class="flex ml-2">
						<Button
							extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-lg"
							textColor="text-white"
							textSize="text-sm"
							bgColor="bg-green-700"
							bgColorHover="bg-green-800"
							on:click={addPositionModal}
							><svg
								style="color: white"
								xmlns="http://www.w3.org/2000/svg"
								width="45"
								height="45"
								fill="currentColor"
								class="bi bi-file-earmark-plus-fill"
								viewBox="0 0 16 16"
							>
								<path
									d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"
									fill="white"
								/>
							</svg>Add Position
						</Button>
						<div class="flex items-center justify-center px-5">
							<label
								for="items"
								class="block mr-2 text-sm font-semibold text-gray-900 dark:text-white"
							>
								Show
							</label>
							<select
								type="number"
								id="items"
								bind:value={pageSize}
								on:change={handleOverFlow}
								class=" bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900  rounded-lg mx-auto"
							>
								<option class="text-sm font-semibold" value="5" selected>5</option>
								<option class="text-sm font-semibold" value="10">10</option>
								<option class="text-sm font-semibold" value="15">15</option>
								<option class="text-sm font-semibold" value="20">20</option>
							</select>
							<label
								for="items"
								class="block mr-2 text-sm font-semibold text-gray-900 dark:text-white"
							>
								entries
							</label>
						</div>
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
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-m  text-gray-700 border-b bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
				<tr class="grid grid-cols-8 ">
					<th scope="col" class="pl-6 py-3 flex"> CODE </th>
					<th scope="col" class="pl-6 py-3 col-span-1 flex">
						POSITION TITLE
						<button
							type="button"
							class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							on:click={() => sortColumn('postionTitle')}
						>
							<svg
								fill="currentColor"
								class="w-5 h-5 dark:text-gray-400"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
								/>
							</svg>
						</button>
					</th>
					<th scope="col" class="pl-6 py-3 col-span-1 flex">
						POSITION STATE
						<button
							type="button"
							class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							on:click={() => sortColumn('postionState')}
						>
							<svg
								fill="currentColor"
								class="w-5 h-5 dark:text-gray-400"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
								/>
							</svg>
						</button>
					</th>
					<th scope="col" class="pl-6 py-3 col-span-1 flex">
						SALARY GRADE
						<button
							type="button"
							class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							on:click={() => sortColumn('salaryGrade')}
						>
							<svg
								fill="currentColor"
								class="w-5 h-5 dark:text-gray-400"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
								/>
							</svg>
						</button>
					</th>
					<th scope="col" class="pl-6 py-3 col-span-1 flex">
						SALARY GRADE STEPS
						<button
							type="button"
							class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							on:click={() => sortColumn('payGradeSteps')}
						>
							<svg
								fill="currentColor"
								class="w-5 h-5 dark:text-gray-400"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
								/>
							</svg>
						</button>
					</th>
					<th scope="col" class="pl-6 py-3 col-span-auto flex"> STATUS </th>
					<th scope="col" class="pl-6 py-3 flex"> ACTION </th>
				</tr>
			</thead>
			<tbody>
				{#key paginatedItems}
					{#if paginatedItems.length}
						{#each paginatedItems as position}
							<tr
								class="grid grid-cols-8 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								on:mouseenter={() => {
									if (currentPosition !== position) {
										currentPosition = position;
									}
								}}
							>
								<th
									scope="row"
									class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
								>
									<div class="text-m font-medium">{position.code}</div>
								</th>
								<td class="flex items-center px-6 py-4 col-span-1">
									<div class="text-m text-gray-700 font-medium">{position.postionTitle}</div>
								</td>
								<td class="flex items-center px-6 py-4 col-span-1">
									<div class="text-m text-gray-700 font-medium">{position.postionState}</div>
								</td>
								<td class="flex items-center px-6 py-4 col-span-1">
									<div class="text-m text-gray-700 font-medium">{position.salaryGrade}</div>
								</td>
								<td class="flex items-center px-6 py-4 col-span-1">
									<div class="text-m text-gray-700 font-medium">{position.payGradeSteps}</div>
								</td>
								<td class="flex items-center px-6 py-4">
									<div class="flex items-center ">
										<div
											class={position.status
												? 'h-2.5 w-2.5 rounded-full bg-green-500 mr-2'
												: 'h-2.5 w-2.5 rounded-full bg-red-500 mr-2'}
										/>
										<div class="text-sm text-gray-700 font-medium">
											{position.status ? 'Active' : 'Inactive'}
										</div>
									</div>
								</td>

								<td class="px-3 py-3 col-span-2">
									<Button
										extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-full"
										hoverTitle="Edit"
										textSize="text-m"
										textColor="text-white"
										bgColor="bg-blue-700"
										bgColorHover="bg-blue-800"
										on:click={editPositionModal}
									>
										<svg
											style="color: white"
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-pen-fill"
											viewBox="0 0 16 16"
										>
											<path
												d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
												fill="white"
											/></svg
										>
									</Button>
									<Button
										extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-full"
										hoverTitle="Delete"
										textSize="text-m"
										textColor="text-white"
										bgColor="bg-red-600"
										bgColorHover="bg-red-700"
										on:click={deletePositionModal}
										><svg
											style="color: white"
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-trash-fill"
											viewBox="0 0 16 16"
										>
											<path
												d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
												fill="white"
											/>
										</svg></Button
									>
								</td>
							</tr>
						{/each}
					{/if}
				{/key}
			</tbody>
			<div class="flex justify-between items-center mt-2">
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
				</div>
			</div>
		</table>
	</div>
</div>

{#if addModalOpen}
	<AddPositionForm bind:addModalOpen {loadPositions} />
{/if}

{#if currentPostionExist}
	{#if editModalOpen}
		<EditPositionForm bind:editModalOpen bind:currentPosition {loadPositions} />
	{/if}
	{#if deleteModalOpen}
		<DeletePositionForm bind:deleteModalOpen bind:currentPosition {loadPositions} />
	{/if}
{/if}
