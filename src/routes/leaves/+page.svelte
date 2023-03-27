<script>
	// @ts-nocheck
   import {onMount} from 'svelte';
   import {paginate} from 'svelte-paginate';
   import AddLeaveForm from '$lib/components/forms/AddLeaveForm.svelte';
   import EditLeaveForm from '$lib/components/forms/EditLeaveForm.svelte'
   import ConfirmDeleteLeave from '$lib/components/forms/ConfirmDeleteLeave.svelte';
   import Button from "$lib/components/reusable/Button.svelte";
   import dateToString from '$lib/utils/dateHelper';



   let status = "all";
	let search;
   let isLeaveFormOpen = false;
   let isEditLeaveOpen = false;
   let isDeleteDataOpen  = false;
   let items = [];
	let currentPage = 1;
	let pageSize = 10;
	let itemSize;
	let paginatedItems = [];
   let currentLeave;
   let pageMinIndex = 1;
   let pageMaxIndex = pageSize;
   let sortOrder = 'asc';
   let sortBy = "code";
   
   
   $: {
      // Prevent user to input below the minimum or beyond the maximum value of pagesize.
      if(pageSize < 1) pageSize = 1;
		// reactive statement to automatically filter data based on status.
      paginatedItems = search
			? items.filter((leave) => {
            return (status !== "all") 
               ? (leave.code.match(RegExp(search, 'gi')) || leave.description.match(RegExp(search, 'gi'))) && 
                  leave.isActive === (status === 'active')
               : leave.code.match(RegExp(search, 'gi')) || leave.description.match(RegExp(search, 'gi'));
			  })
			: items.filter((leave) => {
            return (status !== "all") 
               ? leave.isActive === (status === 'active') 
               : items;
         });
		if (paginatedItems.length) {
			itemSize = paginatedItems.length;
			paginatedItems = paginate({ items: paginatedItems, pageSize, currentPage });
		}
      pageMinIndex = 1 + ((currentPage - 1) * pageSize);
      pageMaxIndex = (pageSize * currentPage > itemSize) ? itemSize : pageSize * currentPage;
   }

   const handleleaveformnModal = () => isLeaveFormOpen = !isLeaveFormOpen;
   const handleEditLeaveModal = () => isEditLeaveOpen = !isEditLeaveOpen;
   const handleConfirmDeleteModal = () => isDeleteDataOpen = !isDeleteDataOpen;
   const handleOverFlow = () => {if(pageMinIndex > itemSize) currentPage = 1} 
   const decrementPageNumber = () => { if(currentPage > 1 ) currentPage -= 1}
   const incrementPageNumber = () => { if(pageMaxIndex < itemSize) currentPage += 1}


   function currentLeaveExist()
   {
      if(currentLeave === undefined || !items.includes(currentLeave)){
         log.error("Selected leave does not exist in items fetch from database!");
         return false;
      }
      if(leave.code === '' || leave.description === ''){
         return false;
      }
      return true;
   }

	async function loadLeave() {
		try {
			let response = await fetch('/api/admin/leave', {
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

   function handleSort(columnName)
   {
      if(columnName === sortBy){
         sortOrder = sortOrder === 'asc'? 'des' : 'asc';
         console.warn(sortOrder);
      }else{
         sortBy = columnName;
      }
      sortItems();
   }

   onMount (async()=> {
      loadLeave();
   });
</script>


<div class="border-2 border-gray-100 rounded-lg h-auto dark:border-gray-700 mt-12">
   <div class="flex flex-col justify-center border-b h-fit rounded bg-gray-300 dark:bg-gray-800">
      <div class="flex flex-col px-5 justify-center py-4">
         <span class="text-xl font-semibold dark:text-white text-gray-900 " >Leaves</span>
         <span class="text-m text-gray-600 dark:text-gray-400">Apply Leave</span>
      </div>
      <div class="flex gap-4 h-auto px-5 py-5 bg-white dark:bg-gray-800">
         <div class="flex flex-col w-full h-auto ">
            <label for="status" class="block mb-2 pl-1 text-m font-semibold text-gray-900 dark:text-white">Status</label>
            <div class="grid grid-cols-9">
               <select id="status" bind:value={status} class=" bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option class="text-gray-900 text-sm font-semibold" value="all" selected>All</option>
                  <option class="text-green-600 text-sm font-semibold"  value="active"> Active</option>
                  <option class="text-red-500 text-sm font-semibold" value="inactive">Inactive</option>
               </select>
               <div class="flex ml-2">
                  <Button
                     extraClasses="w-fit rounded-lg ml-2"
                     textColor="text-white"
                     bgColor="bg-blue-700"
                     bgColorHover="bg-blue-800"
                     on:click={handleleaveformnModal}
                     ><svg fill="none" class="w-5 h-5 dark:text-gray-400"  stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                  </Button>
               </div>
               <div class="col-start-7 col-span-3 rounded ">
                  <form class="flex items-center">   
                     <label for="search" class="sr-only">Search</label>
                     <div class="relative w-full">
                         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                             <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" ><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                         </div>
                         <input type="search" bind:value={search} id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
                     </div>
                 </form>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="flex items-center justify-center h-fit mb-1 rounded bg-gray-50 dark:bg-gray-800">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
         <thead class="text-m  text-gray-700 border-b bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
               <tr class="grid grid-cols-9">
                  <th scope="col" class="pl-6 py-3 flex">
                     CODE
                     <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('code')}>
                        <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                         </svg>
                    </button>

                  </th>
                  <th scope="col" class="pl-6 py-3 flex">
                     DESCRIPTION
                     <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('description')}>
                        <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                         </svg>
                    </button>
                  </th>
                  <th scope="col" class="pl-6 py-3 flex">
                     GROUP TYPE
                     <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('description')}>
                        <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                         </svg>
                    </button>
                  </th>
                  <th scope="col" class="pl-6 py-3 flex">
                     DATE TYPE
                     <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('description')}>
                        <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                         </svg>
                    </button>
                  </th>
                  <th scope="col" class="pl-6 py-3 flex">
                     MAX DAYS
                     <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('description')}>
                        <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                         </svg>
                    </button>
                  </th>
                  <th scope="col" class="pl-6 py-3 flex">
                     DATE BEFORE FILING
                     <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('description')}>
                        <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                         </svg>
                    </button>
                  </th>
                  <th scope="col" class="pl-6 py-3 flex">
                     STATUS
                  </th>
                  <th scope="col" class="px-6 py-3 col-span-2">
                     <div class="flex items-center justify-end ">
                        <label for="items" class="block text-m font-semibold text-gray-900 dark:text-white" >No. of Entries</label>
                        <input type="number" id="items" bind:value={pageSize} on:change={handleOverFlow} class="w-16 h-4 text-sm text-center text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " />
                     </div>
                  </th>
               </tr>
         </thead>
         <tbody>
            {#key paginatedItems}
                {#if paginatedItems.length}
                   {#each paginatedItems as leave}
                     <tr class="grid grid-cols-9 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"  on:mouseenter={() => {if (currentLeave !== leave){currentLeave = leave}}}>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                           <div class="text-m font-medium">{leave.code}</div>
                        </th>
                        <td class="flex items-center px-6 py-4 ">
                           <div class="text-m text-gray-700 font-medium">{leave.description}</div>
                        </td>
                        <td class="flex items-center px-6 py-4 ">
                           <div class="text-m text-gray-700 font-medium">{leave.grouptype}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                           <div class="text-m text-gray-700 font-medium">{leave.datetype}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                           <div class="text-m text-gray-700 font-medium">{leave.maxday}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                           <div class="text-m text-gray-700 font-medium">{dateToString(leave.dbfiling)}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                           <div class="flex items-center ">
                              <div class="{leave.isActive ? 'h-2.5 w-2.5 rounded-full bg-green-500 mr-2': 'h-2.5 w-2.5 rounded-full bg-red-500 mr-2'}"></div>
                              <div class="text-sm text-gray-700 font-medium">{leave.isActive? 'Active' : 'Inactive'}</div>
                           </div>
                        </td>
                        <td class="px-6 py-4">
                           <Button 
                              extraClasses="mx-1 pr-2 pl-4 inline-flex items-center text-center font-semibold rounded-lg" 
                              textSize="text-m" 
                              textColor="text-white" 
                              bgColor="bg-blue-700" 
                              bgColorHover="bg-blue-800"
                              on:click={handleEditLeaveModal}
                              >
                              <svg class="w-5 h-5 mr-2 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"aria-hidden="true">
                                 <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path>
                                 <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path>
                                 </svg></Button>
                           <Button 
                              extraClasses="mx-1 pr-2 pl-4 inline-flex items-center text-center font-semibold rounded-lg" 
                              textSize="text-m" 
                              textColor="text-white" 
                              bgColor="bg-red-600" 
                              bgColorHover="bg-red-700"
                              on:click={handleConfirmDeleteModal}
                              >
                              <svg class="w-5 h-5 mr-2 dark:text-gray-400 " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                 <path clip-rule="evenodd" fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"></path>
                              </svg>
                           </Button>
                        </td>
                     </tr>
                  {/each}
               {/if}
            {/key}
         </tbody>
         <div class="flex flex-col items-center mt-2">
            <span class="text-sm text-gray-700 dark:text-gray-400">
               Showing <span class="font-semibold text-gray-900 dark:text-white">{pageMinIndex}</span> to <span class="font-semibold text-gray-900 dark:text-white">{pageMaxIndex}</span> of <span class="font-semibold text-gray-900 dark:text-white">{itemSize}</span> Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
            <button on:click={decrementPageNumber} class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                  </svg>
                  Prev
            </button>
            <button on:click={incrementPageNumber} class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                  <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
            </button>
            </div>
         </div>
      </table>
   </div>
</div>

{#if isLeaveFormOpen}
   <AddLeaveForm title={'Apply Leeave'} bind:isLeaveFormOpen {loadLeave}/>
{/if}

{#if currentLeaveExist}
   {#if isEditLeaveOpen}
      <EditLeaveForm title={'Apply Leeave'} bind:isEditLeaveOpen bind:currentLeave {loadLeave}/>
   {/if}
   {#if isDeleteDataOpen}
      <ConfirmDeleteLeave bind:isDeleteDataOpen bind:currentLeave {loadLeave}/>
   {/if}
{/if}