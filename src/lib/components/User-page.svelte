<script>
    // @ts-nocheck
	import { onMount } from "svelte";
    import dateToString from '$lib/utils/dateHelper';
	import Sidebar from "./Sidebar.svelte";



    let showUserPage = true;
    let users = [];

    async function loaduserData() {
        try{
            let response = await fetch ('/api/admin/user',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let result = await response.json();
            users = result.response;
        } catch (error){
            console.error('error', error);
        }
    }

    onMount(async () => {
        loaduserData()
    })
</script>

{#if showUserPage}

<div class = "flex">
    {#if Sidebar}
    <Sidebar/>
    {/if}
    <div class = "bg-slate-600 grow">
        <div class = "w-32 Justfiy-center text-white font-serif text-6xl bg-transparent p-4">Employee Page</div>
        <!--Table div-->
        <div class = "overflow-auto w-full h-60 bg-blue-500 m-1 shadow-sm rounded-md shadow-cyan-50 items-center">
            <h1 class = "text-m font-mono text-white shadow-sm text-transparent p-2">Employee list</h1>
            <table class = "w-full bg-slate-100 border-b-2 border-black">
                <thead>
                <tr>
                    <th class = "p-3 text-sm font-semibold tracking-wide text-center">Id</th>
                    <th class = "p-3 text-sm font-semibold tracking-wide text-center">Acc. Created</th>
                    <th class = "p-3 text-sm font-semibold tracking-wide text-center">Services</th>
                    <th class = "p-3 text-sm font-semibold tracking-wide text-center">username</th>
                    <th class = "p-3 text-sm font-semibold tracking-wide text-center">emails</th>
                    <th class = "p-3 text-sm font-semibold tracking-wide text-center">profile</th>
                </tr>
                </thead>
                <tbody>
                {#each users as user}
                <tr>
                    <td class = "p-1 text-sm text-center trakcing-wide font-semibold">{user._id}</td>
                    <td class = "p-1 text-sm text-center trakcing-wide font-semibold">{dateToString(user.createdAt)}</td>
                    <td class = "p-1 text-sm text-center trakcing-wide font-semibold">{user.services}</td>
                    <td class = "p-1 text-sm text-center trakcing-wide font-semibold">{user.username}</td>
                    <td class = "p-1 text-sm text-center trakcing-wide font-semibold">{user.emails}</td>
                    <td class = "p-1 text-sm text-center trakcing-wide font-semibold">{user.profile}</td>
                </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

{/if}