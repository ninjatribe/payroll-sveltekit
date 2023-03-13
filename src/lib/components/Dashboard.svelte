<script>
    let showDashboard = true;
</script>

{#if showDashboard}
<!-- Sidebar Dashboard -->
    <div class = "flex">
        <div class ="bg-blue-400 h-screen p-5 pt-10 shadow-m text-gray-900 w-64 justify-between items-stretch">
            <div class = "pb-5 text-3xl font-mono">Payroll System</div>
            <div class= "flex py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>                  
                <button>Home</button>
            </div>
            <div class ="flex py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <button>Employees</button>                  
            </div>
            <div class = "flex py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                <button>Calendar</button>     
            </div>           
            <div class = "flex py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <button>Projects</button>
            </div>
            <div class = "flex px-3 py-3 absolute bottom-0 left-0">
                <button class = " w-32 text-3xl bg-red-500 text-center font-serif text-gray-50 shadow-m shadow-yellow-50">Logout</button>
            </div>
        </div>
        <!-- Main Dashboard -->
        <!-- Employee table-->
        <div class= "bg-slate-600 grow">
            <div class = "w-32 justify-center text-white font-serif text-6xl bg-transparent p-4">Dashboard</div>
            <div class =  "w-full h-50 bg-blue-500 m-1 shadow-sm shadow-cyan-100 p-4">
                <h1 class = "text-m font-mono text-white shadow-sm text-transparent p-2">Employees Management</h1>
                <table class = "w-full bg-slate-100 border-b-2 border-black ">
                    <thead>
                    <tr>
                        <th class = "p-3 text-sm font-semibold tracking-wide text-center">Employee No.</th>
                        <th class = "p-3 text-sm font-semibold tracking-wide text-center">Employee Name</th>
                        <th class = "p-3 text-sm font-semibold tracking-wide text-center">Wage per hour</th>
                        <th class = "p-3 text-sm font-semibold tracking-wide text-center">Hours worked</th>
                        <th class = "p-3 text-sm font-semibold tracking-wide text-center">overtime Hours</th>
                        <th class = "p-3 text-sm font-semibold tracking-wide text-center">Total Salary</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class = "grid grid-cols-3 w-full h-40 my-5 mx-1">
                <!-- Employee Tracker-->
                <div class = "bg-blue-500 m-1 shadow-sm shadow-cyan-100">
                    <h1 class = "text-s font-mono text-white p-3">Employee list</h1>
                    <table class = "w-full bg-slate-100 border-b-2 border-black">
                        <thead>
                        <tr>
                            <th class = "p-3 text-sm font-semibold tracking-wide text-left">Employee Name</th>
                            <th class = "p-3 text-sm font-semibold tracking-wide text-center">Status</th>
                            <th class = "p-3 text-sm font-semibold tracking-wide text-center">Station</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div>

                </div>
                <!-- Work tracker-->
                <div class= "bg-blue-500 mr-10 shadow-sm shadow-cyan-100">
                    <h1 class = "text-s font-mono text-white p-3">Work hours trakcer</h1>
                </div>
            </div>
            <!-- Transactions bar in progress-->
            <div class = "grid grid-cols-3 w-full h-40 mx-1">
                <div class = "w-full bg-blue-500 shadow-sm shadow-cyan-100">
                    <h1 class = "text-s font-mono text-white p-3">Transactions</h1>
                    <table class = "w-full bg-slate-100 border-b-2 border-black">
                        <thead>
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Transaction</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Date & Time</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Ammount</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Currency</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
{/if}
