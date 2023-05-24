<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { paginate } from 'svelte-paginate';
	import Button from '$lib/components/reusable/Button.svelte';
	import AddUserForm from '$lib/components/forms/users/AddUserForm.svelte';
	import EditUserForm from '$lib/components/forms/users/EditUserForm.svelte';
	import DeleteUserForm from '$lib/components/forms/users/DeleteUserForm.svelte';
	import PaginationButton from '$lib/components/reusable/PaginationButton.svelte';
	import Sort from "$lib/components/reusable/Sort.svelte";

	let search;
	let addModalOpen = false;
	let editModalOpen = false;
	let deleteModalOpen = false;
	let items = [];
	let currentPage = 1;
	let pageSize = 5;
	let itemSize;
	let paginatedItems = [];
	let currentUser;
	let pageMinIndex = 1;
	let pageMaxIndex = pageSize;
	let sortOrder = 'asc';
	let sortBy = 'name';

	$: {
		// Prevent user to input below the minimum or beyond the maximum value of pagesize.
		if (pageSize < 1) pageSize = 1;
		// reactive statement to filter data based on search.
		paginatedItems = search
			? items.filter((user) => {
					return (
						user.profile.displayName.match(RegExp(search, 'gi')) ||
						user.profile.email.match(RegExp(search, 'gi')) ||
						user.profile.phone.match(RegExp(search, 'gi')) ||
						user.profile.province.match(RegExp(search, 'gi')) ||
						user.profile.country.match(RegExp(search, 'gi'))
					);
			  })
			: items;
		if (paginatedItems.length) {
			itemSize = paginatedItems.length;
			paginatedItems = paginate({ items: paginatedItems, pageSize, currentPage });
		}
		pageMinIndex = paginatedItems.length == 0 ? 0 : 1 + (currentPage - 1) * pageSize;
		pageMaxIndex =
			pageSize * currentPage > itemSize ? paginatedItems.length : pageSize * currentPage;
	}

	const addUserModal = () => (addModalOpen = !addModalOpen);
	const editUserModal = () => (editModalOpen = !editModalOpen);
	const deleteUserModal = () => (deleteModalOpen = !deleteModalOpen);
	const handleOverFlow = () => {
		if (pageMinIndex > itemSize) currentPage = 1;
	};
	const decrementPageNumber = () => {
		if (currentPage > 1) currentPage -= 1;
	};
	const incrementPageNumber = () => {
		if (pageMaxIndex < itemSize) currentPage += 1;
	};

	function currentUserExist() {
		if (currentUser === undefined || !items.includes(currentUser)) {
			log.error('The Position does not exist in items fetch from database!');
			return false;
		}
		if (user.profile.displayName === '' || user.profile.email === '') {
			return false;
		}
		return true;
	}

	async function loadUsers() {
		try {
			let response = await fetch('/api/admin/user', {
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
			if (a.profile[sortBy] < b.profile[sortBy]) return -1 * order;
			if (a.profile[sortBy] > b.profile[sortBy]) return 1 * order;
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
		loadUsers();
	});
</script>

<div class="border-2 border-gray-100 overflow-x-auto rounded-lg h-auto dark:border-gray-700 mt-12">
	<div class="flex flex-col justify-center border-b h-fit rounded bg-blue-600 dark:bg-gray-800">
		<div class="flex flex-col px-5 justify-center py-4">
			<span class="text-xl font-semibold" style="color:white">Users</span>
			<span class="text-m" style="color:white">Manage Users</span>
		</div>
		<div class="flex gap-4 h-auto px-5 py-5 bg-white dark:bg-gray-800">
			<div class="flex justify-between w-full h-auto ">
				<div class="flex ml-2">
					<Button
						extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-lg"
						textColor="text-white"
						hoverTitle="Add User"
						textSize="text-sm"
						bgColor="bg-green-700"
						bgColorHover="bg-green-800"
						on:click={addUserModal}
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
	<div class="flex flex-col items-center justify-center h-fit mb-1 rounded bg-gray-50 dark:bg-gray-800">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead
				class="text-m justify-between text-gray-700 border-b bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="pl-6 py-3">
						NAME
						<Sort on:click={() => sortColumn('displayName')}/>
					</th
					>
					<th scope="col" class="pl-6 py-3"> EMAIL </th>
					<th scope="col" class="pl-6 py-3"> PHONE </th>
					<th scope="col" class="pl-6 py-3">
						PROVINCE
						<Sort on:click={() => sortColumn('province')}/>
					</th>
					<th scope="col" class="pl-6 py-3">
						COUNTRY
						<Sort on:click={() => sortColumn('country')}/>
					</th>
					<th scope="col" class="px-6 py-3">
						<div class="flex items-center justify-end ">
							<label for="items" class="block text-m font-semibold text-gray-900 dark:text-white"
								>Show</label
							>
							<input
								type="number"
								id="items"
								bind:value={pageSize}
								on:change={handleOverFlow}
								class="w-14 h-4 text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
								placeholder=" "
							/>
							<label for="items" class="block text-m font-semibold text-gray-900 dark:text-white"
								>entries</label
							>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#key paginatedItems}
					{#if paginatedItems.length}
						{#each paginatedItems as user}
							<tr
								class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								on:mouseenter={() => {
									if (currentUser !== user) {
										currentUser = user;
									}
								}}
							>
								<th
									scope="row"
									class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
								>
									<div class="text-m font-medium">{user.profile.displayName}</div>
								</th>
								<td class="px-6 py-4">
									<div class="text-m text-gray-700 font-medium">{user.profile.email}</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-m text-gray-700 font-medium">{user.profile.phone}</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-m text-gray-700 font-medium">{user.profile.province}</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-m text-gray-700 font-medium">{user.profile.country}</div>
								</td>
								<td class="px-3 py-3">
									<Button
										extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-full"
										hoverTitle="Edit"
										textSize="text-m"
										textColor="text-white"
										bgColor="bg-blue-700"
										bgColorHover="bg-blue-800"
										on:click={editUserModal}
									>
										<svg
											class="w-5 h-5 dark:text-gray-400"
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
										</svg>
									</Button>
									<Button
										extraClasses="mx-1 pr-4 pl-4 inline-flex items-center text-center font-semibold rounded-full"
										hoverTitle="Delete"
										textSize="text-m"
										textColor="text-white"
										bgColor="bg-red-600"
										bgColorHover="bg-red-700"
										on:click={deleteUserModal}
										><svg
											class="w-5 h-5 dark:text-gray-400 "
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

{#if addModalOpen}
	<AddUserForm bind:addModalOpen {loadUsers} />
{/if}

{#if currentUserExist}
	{#if editModalOpen}
		<EditUserForm bind:editModalOpen bind:currentUser {loadUsers} />
	{/if}
	{#if deleteModalOpen}
		<DeleteUserForm bind:deleteModalOpen bind:currentUser {loadUsers} />
	{/if}
{/if}
