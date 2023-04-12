<script>
	// @ts-nocheck
	export let title;
	export let isLoanFormOpen = false;
	import Button from '$lib/components/reusable/Button.svelte';
	export let loadLoan = () => {};

	let code = '',
		description = '',
		comments = ''
		
	function toggleLoanForm() {
		isLoanFormOpen = !isLoanFormOpen;
	}

	async function handleSubmit(event) {
		event?.preventDefault();
		const response = await fetch('/api/admin/loan/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				description,
				comments
			})
		});
		let result = await response.json();
		isLoanFormOpen = false;
		if (result.status === 'Success') {
			console.log('Success');
			loadLoan();
		}
	}
</script>

<div class="fixed z-10 inset-0 overflow-y-auto {isLoanFormOpen ? 'block' : 'hidden'}">
	<div class="flex items-center justify-center min-h-screen">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75" />
		<div
			class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-headline"
		>
			<div class="p-6">
				<h2 class="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
					{title}
				</h2>
				<div class="mt-4">
					<form class="max-w-lg mx-auto " on:submit={handleSubmit}>
						<div class="mb-4">
							<label for="codes" class="block mb-2 font-bold text-gray-700">Code:</label>
							<input
								type="text"
								id="codes"
								name="codes"
								bind:value={code}
								class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							/>
						</div>

						<div class="mt-4">
							<label for="description" class="block mb-2 font-bold text-gray-700">Description</label
							>
							<textarea
								id="description"
								name="description"
								rows="4"
								bind:value={description}
								class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Write here..."
							/>
						</div>

						<div class="mt-4">
							<label for="description" class="block mb-2 font-bold text-gray-700">Description</label
							>
							<textarea
								id="description"
								name="description"
								rows="4"
								bind:value={comments}
								class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Write here..."
							/>
						</div>
						<div class="text-center">
							<div class="grid grid-cols-2">
								<Button
									type="submit"
									extraClasses="col-start-3 mx-2 pr-2 pl-2 inline-flex items-center text-center font-semibold rounded-lg"
									textSize="text-xs"
									textColor="text-white"
									bgColor="bg-green-700"
									bgColorHover="bg-green-900"
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
					</form>
				</div>
			</div>
			<div class="p-2 bg-gray-100 text-right">
				<button
					type="button"
					class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
					on:click={toggleLoanForm}
				>
					Close
				</button>
			</div>
		</div>
	</div>
</div>
