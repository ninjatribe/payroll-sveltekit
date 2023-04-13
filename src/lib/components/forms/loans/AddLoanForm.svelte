<script>
	// @ts-nocheck
	export let title;
	export let isLoanFormOpen = false;
	import Button from '$lib/components/reusable/Button.svelte';
	export let loadLoan = () => {};

	let code = '',
		description = '',
		comments = ''
		
	function handleCloseForm() {
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
							<div class="grid grid-cols-4 grid-rows-2">
                                <Button 
                                    type="submit"
                                    extraClasses="col-start-3 row-start-2 mx-3 pr-2 pl-2 inline-flex items-center text-center font-semibold rounded-lg" 
                                    textSize="text-xs" 
                                    textColor="text-white" 
                                    bgColor="bg-blue-700" 
                                    bgColorHover="bg-blue-800"
                                    >
                                    <svg class="w-5 h-5 mr-1 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                                    Add
                                </Button>
                                <Button 
                                    extraClasses="col-start-4 row-start-2 mx-1 pr-2 pl-2 pt-2 pb-2 inline-flex items-center text-center font-semibold rounded-lg" 
                                    textSize="text-xs" 
                                    textColor="text-gray-900" 
                                    bgColor="bg-white" 
                                    bgColorHover="bg-gray-100" 
                                    borderColor="border-gray-300" 
                                    borderColorHover="border-none" 
                                    on:click={handleCloseForm}
                                    >
                                    <svg class="w-5 h-5 mr-1 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
                                    </svg>
                                    Close
                                </Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
