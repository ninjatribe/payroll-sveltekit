<script>
	// @ts-nocheck
	import Button from '$lib/components/reusable/Button.svelte';

	export let addModalOpen = false;
	export let loadPositions = () => {};

	let code = '';
	let postionTitle = '';
	let postionState = '';
	let salaryGrade = '';
	let payGradeSteps = '';
	let payBasis = '';
	let vacancy = '';
	let plantillaItemNo = '';
	let remarks = '';
	let isBioChecked = false;
	let isDtrChecked = false;
	let isLeaveChecked = false;
	let isDriverChecked = false;
	let error = '';

	const closeModal = () => (addModalOpen = false);

	async function submitData(event) {
		event?.preventDefault();
		if (vacancy === '') {
			vacancy = '0';
		}
		const response = await fetch('/api/admin/positions/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				postionTitle,
				postionState,
				salaryGrade,
				payGradeSteps,
				payBasis,
				vacancy,
				plantillaItemNo,
				remarks
			})
		});
		const result = await response.json();
		if (result.error) {
			error = alert(result.errorMessage) || 'An error occured';
		} else {
			addModalOpen = false;
		}
		if (result.status === 'Success') {
			loadPositions();
		}
	}
</script>

<div class="fixed z-10 inset-0 overflow-y-auto {addModalOpen ? 'block' : 'hidden'}">
	<div class="flex items-center justify-center min-h-screen px-4">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		<div
			class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full max-h-96 overflow-y-scroll"
		>
			<div class="bg-gray-100 px-4 py-3 border-b">
				<h4 class="text-lg font-medium text-gray-600">Add New Position</h4>
			</div>
			<div class="px-4 py-5 sm:p-6">
				<form>
					<div class="mb-4">
						<label for="pay-basis" class="block text-gray-700 font-medium mb-2"
							>Pay Basis<span class="text-red-500">*</span></label
						>
						<select
							id="pay-basis"
							name="pay-basis"
							class="block w-full p-2 border border-gray-300 rounded shadow-sm"
							bind:value={payBasis}
						>
							<option value="Bi-Weeky">Bi-Weekly</option>
							<option value="Annual">Annual</option>
							<option value="Hourly">Hourly</option>
							<option value="Fee">Fee</option>
						</select>
					</div>
					<div class="mb-4">
						<label for="position-name" class="block text-gray-700 font-medium mb-2"
							>Position Name<span class="text-red-500">*</span></label
						>
						<input
							type="text"
							id="position-name"
							name="position-name"
							bind:value={postionTitle}
							class="block w-full p-2 text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
					</div>
					<div class="mb-4">
						<label for="position-name" class="block text-gray-700 font-medium mb-2"
							>Code<span class="text-red-500">*</span></label
						>
						<input
							type="text"
							id="code"
							name="code"
							bind:value={code}
							class="block w-full p-2 text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
					</div>
					<div class="flex justify-between">
						<div class="w-1/2 mr-2">
							<label for="salary-grade" class="block text-gray-700 font-medium mb-2"
								>Salary Grade<span class="text-red-500">*</span></label
							>
							<select
								id="salary-grade"
								name="salary-grade"
								class="block w-full p-2 border border-gray-300 rounded shadow-sm"
								bind:value={salaryGrade}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
							</select>
						</div>
						<div class="w-1/2 ml-2">
							<label for="salary-grade-step" class="block text-gray-700 font-medium mb-2"
								>Salary Grade Step<span class="text-red-500">*</span></label
							>
							<select
								id="salary-grade-step"
								name="salary-grade-step"
								class="block w-full p-2 border border-gray-300 rounded shadow-sm"
								bind:value={payGradeSteps}
							>
								<option value="1-Step">1-Step</option>
								<option value="2-Step">2-Step</option>
								<option value="3-Step">3-Step</option>
								<option value="4-Step">4-Step</option>
							</select>
						</div>
					</div>
					<div class="mb-4">
						<label for="position-state" class="block text-gray-700 font-medium mb-2"
							>Position State<span class="text-red-500">*</span></label
						>
						<select
							id="position-state"
							name="position-state"
							class="block w-full p-2 border border-gray-300 rounded shadow-sm"
							bind:value={postionState}
						>
							<option value="Permanent">Permanent</option>
							<option value="Temporary">Temporary</option>
						</select>
					</div>
					<div class="flex justify-between">
						<div class="w-1/2 mr-2">
							<label for="vacancy" class="block text-gray-700 font-medium mb-1">Vacancy</label>
							<input
								type="text"
								id="vacancy"
								name="vacancy"
								bind:value={vacancy}
								class="block w-full p-2 text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
						</div>
						<div class="w-1/2 ml-2">
							<label for="plantilla-item-no" class="block text-gray-700 font-medium mb-1"
								>Plantilla Item No.<span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="plantilla-item-no"
								name="plantilla-item-no"
								bind:value={plantillaItemNo}
								class="block w-full p-2 text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
						</div>
					</div>

					<h2 class="text-sm font-bold text-red-900 dark:text-red mt-6 mb-2">
						NOTE:<span class="text-red-500">*</span>
					</h2>
					<ul
						class="max-w-md space-y-1 text-red-500 text-s list-none list-inside dark:text-red-400
						mb-6"
					>
						<li class="text-xs">Biometrix Break - if employee need to break in and break</li>
						<li class="text-xs">DTR - if employee need to submit DTR</li>
						<li class="text-xs">
							Leave Recommendation - if employee dont have a recommendation officer
						</li>
						<li class="text-xs">Drivers - if the position is driver</li>
					</ul>
					<div class="flex justify-between">
						<div class="flex items-center mb-4">
							<div class="w-1/2 mr-2">
								<input
									id="bio-checkbox"
									type="checkbox"
									bind:checked={isBioChecked}
									on:change={() => {
										remarks = isBioChecked ? 'Biometrix Break' : '';
									}}
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									for="bio-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>Biometrix Break</label
								>
							</div>
							<div class="w-1/2 ml-2">
								<input
									id="dtr-checkbox"
									type="checkbox"
									bind:checked={isDtrChecked}
									on:change={() => {
										remarks = isDtrChecked ? 'DTR' : '';
									}}
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									for="dtr-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DTR</label
								>
							</div>
						</div>
					</div>
					<div class="flex justify-between">
						<div class="flex items-center mb-4">
							<div class="w-1/2 mr-2">
								<input
									id="leave-recommendation-checkbox"
									type="checkbox"
									bind:checked={isLeaveChecked}
									on:change={() => {
										remarks = isLeaveChecked ? 'Leave Recommendation' : '';
									}}
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									for="leave-recommendation-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>Leave Recommendation</label
								>
							</div>
							<div class="w-1/2 ml-2">
								<input
									id="driver-checkbox"
									type="checkbox"
									bind:checked={isDriverChecked}
									on:change={() => {
										remarks = isDriverChecked ? 'Driver' : '';
									}}
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									for="driver-checkbox"
									class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Driver</label
								>
							</div>
						</div>
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
							>Add</Button
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
				</form>
			</div>
		</div>
	</div>
</div>
