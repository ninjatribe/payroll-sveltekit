<script>
    // @ts-nocheck
    import Button from "../reusable/Button.svelte";

    export let isAddModalOpen = false;
    export let loadDivision = () => {};

    let code = '';
    let description = '';

    const handleCloseModal = () => isAddModalOpen = false;


    async function handleSubmit(event)
    {
		event?.preventDefault();
		const response = await fetch('/api/admin/division/insert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				description,
			})
		});
		let result = await response.json();
		isAddModalOpen = false;
		if (result.status === 'Success') {
            console.log("Success");
            loadDivision();
		}
    }

</script>

<div class="fixed z-10 inset-0 overflow-y-auto {isAddModalOpen? 'block': 'hidden'}">
	<div class="flex items-center justify-center min-h-screen">
		<div class="fixed inset-0 bg-gray-800 bg-opacity-25" />
        <div 
            class="fixed inset-0 z-50 w-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
            id="add-department-modal" 
            tabindex="-1" 
            aria-hidden="true" >
            <div class="relative w-full h-full  max-w-md md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button on:click={handleCloseModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8"> 
                        <div class="flex justify-center items-start">
                            <h3 class="mb-4 text-m uppercase font-semibold text-gray-900 dark:text-white">Add New Division</h3>
                        </div>
                        <form class="space-y-6" on:submit={handleSubmit}>
                            <div>
                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                                <input 
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    type="text" 
                                    name="code" 
                                    id="code"
                                    bind:value={code} 
                                    required
                                >
                            </div>
                            <div>
                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea 
                                    class="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    id="description"
                                    name="description" 
                                    bind:value={description} 
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <div class="grid grid-cols-4">
                                <Button 
                                    type="submit"
                                    extraClasses="col-start-3 mx-3 pr-2 pl-2 inline-flex items-center text-center font-semibold rounded-lg" 
                                    textSize="text-xs" 
                                    textColor="text-white" 
                                    bgColor="bg-blue-700" 
                                    bgColorHover="bg-blue-800"
                                    >
                                    <svg class="w-5 h-5 mr-1 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                                    Add
                                </Button>
                                <Button 
                                    extraClasses="col-start-4 mx-1 pr-2 pl-2 pt-2 pb-2 inline-flex items-center text-center font-semibold rounded-lg" 
                                    textSize="text-xs" 
                                    textColor="text-gray-900" 
                                    bgColor="bg-white" 
                                    bgColorHover="bg-gray-100" 
                                    borderColor="border-gray-300" 
                                    borderColorHover="border-none" 
                                    on:click={handleCloseModal}
                                    >
                                    <svg class="w-5 h-5 mr-1 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
                                    </svg>
                                    Close
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</div>