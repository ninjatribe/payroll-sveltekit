<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import dateToString from '$lib/utils/dateHelper';
	import Button from '$lib/components/reusable/Button.svelte';

	let showUserPage = true;
	let users = [];

	async function loaduserData() {
		try {
			let response = await fetch('/api/admin/users', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			let result = await response.json();
			users = result.response;
		} catch (error) {
			console.error('error', error);
		}
	}

	onMount(async () => {
		loaduserData();
	});
</script>

{#if showUserPage}
	<div class="border border-gray-200 rounded mr-4 py-4">
		<div class="flex flex-col">
			<div class="flex flex-row">
                <h1 class="text-gray-500 text-xl px-4">Users</h1>
                <Button bgColor='bg-green-500' textColor='text-white' textSize='text-xs' on:click={() => {  }} >Add</Button>
            </div>
			<div class="flex flex-col">
				<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
						<div class="overflow-hidden">
							<table class="min-w-full text-left text-sm font-light">
								<thead class="border-b font-medium dark:border-neutral-500">
									<tr>
										<th scope="col" class="px-6 py-4">Name</th>
										<th scope="col" class="px-6 py-4">Email</th>
										<th scope="col" class="px-6 py-4">Phone</th>
										<th scope="col" class="px-6 py-4">Province</th>
										<th scope="col" class="px-6 py-4">Country</th>
										<th scope="col" class="px-6 py-4">Actions</th>
									</tr>
								</thead>
								<tbody>
                                    {#each users as user}
                                    <tr
                                    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                >
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{user.profile.displayName}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{user.profile.email}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{user.profile.phone}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{user.profile.province}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{user.profile.country}</td>
                                    <td class="whitespace-nowrap px-6 py-4"></td>
                                </tr>
                                    {/each}
									
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
