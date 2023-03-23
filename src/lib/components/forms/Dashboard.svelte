<script>
    let showDashboard = true;
</script>

{#if showDashboard}
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
{/if}
