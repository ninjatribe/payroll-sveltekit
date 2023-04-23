<script>
	// @ts-nocheck
	import Button from '$lib/components/reusable/Button.svelte';
	import { onMount } from 'svelte';

	export let editModalOpen = false;
	export let currentHoliday;
	export let loadHolidays = () => {};

	let _id = '';
	let date = '';
	let description = '';
	let time = '';
	let holidayType = '';
	let error = '';

	function editValues() {
		if (currentHoliday === undefined) {
			currentHoliday = [
				{ _id: 'NA' },
				{ date: 'NA' },
				{ description: 'NA' },
				{ time: 'NA' },
				{ holidayType: 'NA' }
			];
		}
		_id = currentHoliday._id;
		date = currentHoliday.date;
		description = currentHoliday.description;
		time = currentHoliday.time;
		holidayType = currentHoliday.holidayType;
	}

	const closeModal = () => (editModalOpen = false);

	async function submitData(event) {
		event?.preventDefault();
		const response = await fetch('/api/admin/holidays/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id,
				date,
				description,
				time,
				holidayType
			})
		});
		const result = await response.json();
		if (result.error) {
			error = alert(result.errorMessage) || 'An error occured';
		} else {
			editModalOpen = false;
		}
		if (result.status === 'Success') {
			loadHolidays();
		}
	}

	onMount(() => {
		editValues();
	});
</script>

<div class="fixed z-10 inset-0 overflow-y-auto {editModalOpen ? 'block' : 'hidden'}">
	<div class="flex items-center justify-center min-h-screen px-4">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		<div
			class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
		>
			<div class="bg-gray-100 px-4 py-3 border-b">
				<h4 class="text-lg font-medium text-gray-600">
					Add a Holiday<span class="text-red-500">*</span>
				</h4>
			</div>
			<div class="px-4 py-5 sm:p-6">
				<form>
					<div class="mb-4">
						<label for="holiday-type" class="block text-gray-700 font-medium mb-2"
							>Holiday Type</label
						>
						<select
							id="holiday-type"
							name="holiday-type"
							class="block w-full p-2 border border-gray-300 rounded shadow-sm"
							bind:value={holidayType}
						>
							<option value="Legal">Legal</option>
							<option value="Special">Special</option>
							<option value="Work Suspension">Work Suspension</option>
						</select>
					</div>
					<div class="flex justify-between">
						<div class="w-1/2 mr-2">
							<label for="vacancy" class="block text-gray-700 font-medium mb-2"
								>Date(MM-DD-YYYY)<span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="vacancy"
								name="vacancy"
								bind:value={date}
								class="block w-full p-2 text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
						</div>
						<div class="w-1/2 ml-2">
							<label for="plantilla-item-no" class="block text-gray-700 font-medium mb-2"
								>Time (If Work Suspension)<span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="plantilla-item-no"
								name="plantilla-item-no"
								bind:value={time}
								class="block w-full p-2 text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
						</div>
					</div>
					<div class="mb-4">
						<label for="description" class="block text-gray-700 font-medium mt-2 mb-2"
							>Description</label
						>
						<textarea
							id="description"
							rows="4"
							class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={description}
						/>
					</div>
					<div class="mt-6 flex justify-end">
						<Button
							extraClasses="inline-flex mr-2"
							textSize="text-sm"
							textColor="text-white"
							bgColor="bg-green-600"
							bgColorHover="bg-green-900"
							on:click={submitData}
						>
							<svg
								style="color: white"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-file-earmark-plus-fill mr-1"
								viewBox="0 0 16 16"
							>
								<path
									d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"
									fill="white"
								/></svg
							>Update</Button
						>
						<Button
							extraClasses="inline-flex ml-2"
							textSize="text-sm"
							textColor="text-white"
							bgColor="bg-red-700"
							bgColorHover="bg-red-800"
							on:click={closeModal}
							><svg
								style="color: white"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-dash-circle-fill mr-1"
								viewBox="0 0 16 16"
							>
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
									fill="white"
								/></svg
							>Close</Button
						>
					</div>
					<div class="text-custom-red h-1">{error}</div>
				</form>
			</div>
		</div>
	</div>
</div>
