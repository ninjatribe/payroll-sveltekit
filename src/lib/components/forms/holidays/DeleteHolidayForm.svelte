<script>
	// @ts-nocheck
	import Button from '$lib/components/reusable/Button.svelte';

	export let deleteModalOpen = false;
	export let currentHoliday;
	export let loadHolidays = () => {};

	const position = currentHoliday;
	const _id = position._id;

	const closeModal = () => (deleteModalOpen = false);

	async function deleteData(event) {
		event?.preventDefault();
		const response = await fetch('/api/admin/holidays/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ _id })
		});
		let result = await response.json();
		deleteModalOpen = false;
		if (result.status === 'Success') {
			loadHolidays();
		}
	}
</script>

<div class="fixed z-10 inset-0 overflow-y-auto {deleteModalOpen ? 'block' : 'hidden'}">
	<div class="flex items-center justify-center min-h-screen">
		<div class="fixed inset-0 bg-gray-800 bg-opacity-25" />
		<div
			id="popup-modal"
			tabindex="-1"
			class="fixed inset-0 z-50 w-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
		>
			<div class="relative w-full h-full max-w-md md:h-auto">
				<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div class="p-6 text-center">
						<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this Holiday?
						</h3>
						<h2 class="py-3">{currentHoliday.description}</h2>
						<Button
							extraClasses="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
							textColor="text-white"
							bgColor="bg-red-600"
							bgColorHover="bg-red-800"
							textSize="text-sm"
							borderColor="bg-red-600"
							borderColorHover="bg-red-800"
							on:click={deleteData}>Yes, Im Sure</Button
						>
						<Button
							extraClass="text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							textColor="text-black"
							bgColor="bg-gray"
							bgColorHover="bg-gray-100"
							textSize="text-sm"
							borderColor="border-gray-200"
							borderColorHover="bg-gray-800"
							on:click={closeModal}>No, cancel</Button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
