<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import AddEmployeeform from "$lib/components/forms/AddEmployeeform.svelte";
	import { log } from "xstate/lib/actions";
	import { paginate } from "svelte-paginate";
    import UpdateEmployeeForm from "$lib/components/forms/UpdateEmployeeForm.svelte";
	import DeleteEmployeeform from "$lib/components/forms/DeleteEmployeeform.svelte";

    //loads user data
    let items = [];
    let status = "all";
    let search;
    let currentPage = 1;
    let pageSize = 10;
    let itemSize;
    let paginatedItems = [];
    let currentEmployee;
    let pageMinIndex;
    let pageMaxIndex;
    let sortOrder = 'asc';
    let sortBy = 'empNo';
    const decrementPageNumber = () => { if(currentPage > 1 ) currentPage -= 1}
    const incrementPageNumber = () => { if(pageMaxIndex < itemSize) currentPage += 1}

    $: {
        //prevents user to input below the minimum or beyond the maximum value of pagesize.
        if(pageSize < 1) pageSize = 1;

        paginatedItems = search 
        ?items.filter((employees) =>{
            return (status !== all)
            ? (employees.empNo.match(RegExp(search,'gi')) || employees.emp_email.match(RegExp(search,'gi'))) &&
             employees.isActive === (status === 'active')
            : employees.empNo.match(RegExp(search,'gi')) || employees.emp_email.match(RegExp(search,'gi'));
        })
        : items.filter((employees) => {
            return (status !== "all")
            ? employees.isActive === (status === 'active')
            : employees;
        });
        if (paginatedItems.length) {
			itemSize = paginatedItems.length;
			paginatedItems = paginate({ items: paginatedItems, pageSize, currentPage });
		}
        pageMinIndex = 1 + ((currentPage -1)*pageSize);
        pageMaxIndex = (pageSize * currentPage > itemSize) ? itemSize: pageSize * currentPage;
    }

    //handles modals
    let isAddEmployeeModalopen = false;
    let isUpdateEmployeeModalopen = false;
    let isDeleteEmployeeModalOpen = false;

    function currentEmployeeExists()
    {
        if(currentEmployee === undefined || items.includes(currentEmployee)){
            log.error("Selected employee does not exist in items fetch from database");
            return false;
        }
        if(items.empNo == '' || employees.emp_email == ''){
            return false;
        }
        return true;
    }

    async function loadEmployees(){
        try{
            let response = await fetch('api/admin/Employee', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let result = await response.json();
            items = result.response;
        } catch(error){
            console.error('error',error);
        }
    }

    function sortItems(){
        let order = sortOrder = 'asc' ? 1 : -1;
        items = items.sort((a,b) => {
        if (a[sortBy] < b[sortBy]) return -1 *order;
        if (a[sortBy] > b[sortBy]) return 1* order;
        return 0;
    });
    }

    function handleSort(columnName){
        if (columnName === sortBy){
            sortOrder = sortOrder === 'asc' ? 'des' : 'asc';
            console.warn(sortOrder);
        }else{
            sortBy = columnName;
        }
        sortItems()
    }

    onMount (async() => {
        loadEmployees();
    });

    const handleOpenModalAddEmployees = () => isAddEmployeeModalopen = !isAddEmployeeModalopen
    const handleOPenModalUpdateEmployees = () => isUpdateEmployeeModalopen = !isUpdateEmployeeModalopen
    const handleOpenModalDeleteEmployees = () => isDeleteEmployeeModalOpen = !isDeleteEmployeeModalOpen
</script>

<!--Main page-->
<div class = "border-gray-100 rounded-lg h-auto dark:border-gray-700 mt-12">
    <div class = "flex flex-col justify-center border-b h-fit rounded bg-blue-600 dark:bg-gray-800">
        <div class="flex flex-col px-5 justify-center py-4">
            <span class="text-xl font-semibold" style="color:white">Employees</span>
            <span class="text-m" style="color:white">Manage Employees</span>
        </div>
    </div>
    <div class = "p-2 h-auto rounded-lg">
        <!--Search function and add employees button WIP-->
        <div class = "w-full h-auto">
            <div class = "grid grid-cols-8 w-full h-auto p-3 gap-4">  
                <select id="status" bind:value={status} class="bg-gray-50 border border-gray-300 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 m-4 w-32">
                    <option class = "text-black text-sm font-serif" value="all" selected>all</option>
                    <option class = "text-black text-sm font-serif" value="active">Active</option>
                    <option class = "text-black text-sm font-serif" value="inActive">Inactive</option>
                </select>
                <button class = "p-3 m-4 bg-green-600 rounded-lg h-12 w-32" on:click={handleOpenModalAddEmployees}>Add Record</button>
                <div class = " col-start-7 col-span-2 rounded">
                    <form class ="mt-5 flex items-center">
                        <label for = "search" class = "sr-only">search</label>
                        <div class = "flex relative w-full">
                            <input type="search" bind:value={search} id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--Employee Table-->
    <div class = "flex items-center justify-center h-fit mb-1 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div class = "grow p-2">
            <div class = "p-3 text-2xl font-mono">Employee list</div>
            <table class = "p-4 w-full bg-slate-100 border-b-2 border-black rounded-m border-seperate text-left overflow-auto">
                <thead>
                    <tr class="grid grid-cols-10">
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-center">Employee No.
                            <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('empNo')}>
                                <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                                   <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                                 </svg>
                        </th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-left">Username</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-left">Date Created</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-left">Address</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-left">Services</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-left">Email
                            <button type="button" class="text-gray-400 justify-end bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" on:click={() => handleSort('emp_email')}>
                                <svg fill="currentColor" class="w-5 h-5 dark:text-gray-400" viewBox="0 0 24 24" aria-hidden="true">
                                   <path clip-rule="evenodd" fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"></path>
                                 </svg>
                            </button>
                        </th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-center">Verified</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-center">Payroll info</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-center">PDS info</th>
                        <th scope = "col" class = "p-3 text-sm font-semibold tracking-wide text-center">Update Employee</th>
                    </tr>    
                </thead>
                <tbody>
                    {#key paginatedItems}
                     {#if paginatedItems.length}
                     {#each paginatedItems as employees}
                      <tr class="grid grid-cols-10 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"  on:mouseenter={() => {if (currentEmployee !== employees){currentEmployee = employees}}}>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="text-sm font-medium">{employees.empNo}</div>
                        </th>
                        <td class="flex items-center px-6 py-4">
                            <div class="text-sm font-medium">{employees.fullName}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <div class="text-sm font-medium">placeholder</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <div class="text-sm font-medium">placeholder</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <div class="text-sm font-medium">{employees.emp_div}</div>
                        </td>
                        <td class="flex items-left px-6 py-4">
                            <div class="text-sm font-medium">{employees.emp_email}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <div class="{employees.isActive ? 'h-2.5 w-2.5 rounded-full bg-green-500 mr-2': 'h-2.5 w-2.5 rounded-full bg-red-500 mr-2'}"></div>
                            <div class="text-sm text-gray-700 font-medium">{employees.isActive? 'Active' : 'Inactive'}</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <div class="text-sm font-medium">placeholder</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <div class="text-sm font-medium">placeholder</div>
                        </td>
                        <td class="flex items-center px-6 py-4">
                            <button
                            class="mx-1 pl-4 inline-flex items-center text-center font-serif rounded-lg text-sm bg-blue-600" on:click={handleOPenModalUpdateEmployees}>Update</button>
                            <button class = "pl-2 text-sm bg-red-600 rounded-lg" on:click={handleOpenModalDeleteEmployees}>Delete</button>
                        </td>
                    </tr>
                    {/each}
                    {/if}
                    {/key}    
                </tbody>
                <div class = "flex flex=col items-center mt-4">
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
</div>

{#if isAddEmployeeModalopen}
    <AddEmployeeform bind:isAddEmployeeModalopen title="Add Employee" {loadEmployees}/>
{/if}

{#if currentEmployeeExists}
 {#if isUpdateEmployeeModalopen}
    <UpdateEmployeeForm bind:isUpdateEmployeeModalopen bind:currentEmployee title = "Update Employee" {loadEmployees}/>
 {/if}
 {#if isDeleteEmployeeModalOpen}
    <DeleteEmployeeform bind:isDeleteEmployeeModalOpen bind:currentEmployee {loadEmployees}/>
 {/if}
{/if}