<script>

    // @ts-nocheck
    export let title;
    export let isAddEmployeeModalopen = false;
    export let loadEmployees = () => {};

    //submit variables
    let emp_picture = '';
    let empNo = '';
    let empScanNo = '';
    let empFullName = {};
    let emp_div = '';
    let emp_email = '';
    let empDateofBirth = '';
    let empPlaceofBirth = '';
    let empSex = '';
    let empCivStatus ='';
    let empCivService = {};
    let empWorkExperience = {};
    let empCharityWork ={};
    let empLearningAndDevelopment = {};
    let emp_file = '';


    const handleClose = () => isAddEmployeeModalopen = false;

    async function handleSubmit(event){
        console.log("HANDLE SUBMIT WORKS");
        event?.preventDefault();
        const response = await fetch('api/admin/Employee/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emp_picture,
                empNo,
                empScanNo,
                empFullName,
                emp_div,
                emp_email,
                empDateofBirth,
                empPlaceofBirth,
                empSex,
                empCivStatus,
                empWorkExperience,
                empCharityWork,
                empLearningAndDevelopment,
                emp_file
            })
        });
        let result = await response.json();
        isAddEmployeeModalopen = false;
        if (result.status === 'Success'){
            console.log("Success");
            loadEmployees()
        }
        else{
            console.error("failed");
        }
    }

    </script>

<div class="fixed z-10 inset-0 overflow-y-auto {isAddEmployeeModalopen ? 'block' : 'hidden'}">
    <div class="flex items-center justify-center min-h-screen">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75" />
		<div
			class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-6xl w-full mx-auto"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-headline"
        >
            <div class = "p-6">
                <h1 class= "text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                    {title}
                </h1>
                <div class = "mt-4">
                    <ul class = "flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray dark:border-gray-700 dark:text-gray-400" id="mytab" data-tabs-toggle="#myTabcontent" role="tablist">
                        <li class = "ml-6" role="presentation">
                            <button class = "inline-block p-4 border-b-2 rounded-t-lg" id ="Page1-tab" data-tabs-target ="#page1" type ="button" role="tab" aria-controls="page1" aria-selected="false">Page1</button>
                        </li>
                        <li class = "ml-6" role="presentation">
                            <button class = "inline-block p-4 border-b-2 rounded-t-lg" id ="Page2-tab" data-tabs-target="#page2" type = "button" role="tab" aria-controls="page2" aria-selected="false">Page2</button>
                        </li>
                        <li class = "ml-6" role="presentation">
                            <button class = "inline-block p-4 border-b-2 rounded-t-lg" id ="Page3-tab" data-tabs-target="#page3" type = "button" role="tab" aria-controls="page3" aria-selected="false">Page3</button>
                        </li>
                        <li class = "ml-6" role="presentation">
                            <button class = "inline-block p-4 border-b-2 rounded-t-lg" id ="Page4-tab" data-tabs-target="#page4" type = "button" role="tab" aria-controls="page4" aria-selected="false">Page4</button>
                        </li>
                    </ul>
                    <form class = "w-full mx-auto" on:submit={handleSubmit}>
                        <!--main form-->
                        <!--Page 1-->
                        <!--<div id = "myTabContent">
                            <div class = "hidden p-4 rounded-lg bg-gray-50 w-full h-auto" id="page1" role="tabpanel" aria-labelledby="page1-tab">
                                <div class = "py-4 text-2xl font-serif">I. Personal Information</div>
                            </div>
                        </div>-->
                        <div class = "py-4 text-2xl font-serif">I. Personal Information</div>
                        <!--image upload-->
                        <div class = "grid grid-cols-5 border-black border-2 h-64">
                            <div></div>
                            <div></div>
                            <input type = "file" id="emp_picture" bind:value={emp_picture} name ="emp_picture_upload" required>   
                            <div></div>
                            <div></div>
                        </div>
                        <div class = "flex w-auto h-auto py-4 flex-start border-b-2 border-black">
                            <div class = "flex pr-3">
                                <label for = "Employee No." class = "font-serrif text-large pl-4 m-2 h-12">Employee No.</label>
                                <input 
                                type="text"
                                name = "emp_id" 
                                id = "emp_id"
                                bind:value={empNo}
                                class = "shadow appearance-none rounded-sm h-12"
                                required
                                >
                            </div>
                            <div class = "flex pr-3">
                                <label for = "Scanning No." class = "font-seriftext-large pl-40 m-2 h-12">Scanning No.</label>
                                <input 
                                type="text"
                                name = "empScanNo" 
                                id="empScanNo" 
                                bind:value={empScanNo}
                                required
                                class = "shadow appearance-none rounded-sm h-12">

                            </div>
                        </div>
                        <div class = "flex py-5 w-auto h-auto align-content: flex-start border-b-2 border-black">
                            <label for="asdu" class = "text-lg p-3 font-serif">SERVICE/DIVISION/UNIT</label>
                            <input type="text" id="sdu_id" bind:value={emp_div} class = "shadow appearance-none rounded-sm h-12" required>
                            <label for="empEmail" class = "text-lg p-3 font-serif ml-64">Email</label>
                            <input type="text" id="emp_email" bind:value={emp_email}>
                        </div>
                        <div class = "grid grid-cols-5 border-b-2 w-auto h-auto">
                            <div class = "text-lg">Employee Name</div>
                            <label for = "firstName" class = "text-lg">First Name</label>
                            <label for = "lastName" class = "text-lg">Last Name</label>
                            <label for = "Surname" class = "text-lg">Surname</label>
                            <label for = "Name Extension:" class = "text-lg">Name Extension "Jr. Sr. etc."</label>

                            <div></div>

                            <input type="text" id="fname" name="fname" bind:value={empFullName.firstName} class = "text-lg" required>
                            <input type="text" id="lname" name="lname" bind:value={empFullName.lastName} class = "text-lg" required>
                            <input type="text" id="sname" name="sname" bind:value={empFullName.surName} class = "text-lg" required>
                            <input type="text" id= "exName" name="exName" bind:value={empFullName.extendName} class = "text-lg" required>
                        </div>
                        <div class = "flex py-5 w-auto h-auto border-b-2">
                            <label for="dateOfBirth" class= "text-lg mr-4">Date of Birth</label>
                            <input 
                            type="text" 
                            id="dateOfBirth" 
                            placeholder="dd/mm/yyyy" 
                            bind:value={empDateofBirth} 
                            class = "text-lg border-b-2 shadow appearance-none border-blue-600" 
                            required
                            >

                            <label for="placeOfBirth" class = "text-lg ml-4 mr-4 pl-80">Place of Birth</label>

                            <input 
                            type="text" 
                            id="placeOfBirth" 
                            bind:value={empPlaceofBirth} 
                            class="text-lg border-b-2 shadow appearance-none border-blue-600" 
                            required
                            >
                        </div>
                        <div class = "flex py-5 w-auto h-auto border-b-2">
                            <label for="sex" class = "text-lg mr-4">Sex</label>
                            <input 
                            type="text" 
                            id="sex" 
                            bind:value={empSex} 
                            class="text-lg border-b-2 shadow appearance-none border-blue-600"
                            required
                            >

                            <label for="civilStatus" class="text-lg ml-4 mr-4 pl-96">Civil Status</label>
                            <input 
                            type="text" 
                            id="civilStatus" 
                            bind:value={empCivStatus}
                            class="text-lg border-b-2 shadow appearance-none border-blue-600"
                            required
                            >
                        </div>
                        <!--Page 2-->
                        <!--Civil Service form-->
                        <div class = "border-b-2 border-black w-auto h-auto bg-white">
                            <div class = "py-4 text-2xl font-serif">IV. Civil Service Elgibility</div>
                            <div class = "p-3 border-2 border-black">
                                <div class = "grid grid-cols-8 h-auto w-full overflow-x-auto pb-5">
                                    <div class = "border-2 border-black p-2">CAREER SERVICE/ RA 1080 under special laws / CES /CSEE / BARANGAY ELIGIBILITY/ DRIVERS LISCENCE</div>
                                    <div class = "border-2 border-black p-2 pl-8">RATING</div>
                                    <div class = "border-2 border-black p-2">DATE OF EXAMINATION/ CONFERMENT</div>
                                    <div class = "border-2 border-black p-2">Place of Examination/ CONFERMENT</div>
                                    <div class = "border-2 border-black p-2">LISCENCE</div>
                                    <div class = "border-2 border-black p-2">LISCENCE NUMBER</div>
                                    <div class = "border-2 border-black p-2">DATE OF VALIDITY</div>
                                    <div class = "border-2 border-black p-2">ACTION</div>
                                    <input type="text" id ="carService" bind:value={empCivService.careerService} class="text-lg" required>
                                    <input type="text" id ="rating" bind:value={empCivService.rating} class="text-lg" required>
                                    <input type="text" id="examDate" bind:value={empCivService.dateofExam} class="text-lg" required>
                                    <input type="text" id="examPlace" bind:value={empCivService.placeofExam} class="text-lg" required>
                                    <input type="text" id="lisence" bind:value={empCivService.lisence} class="text-lg" required>
                                    <input type="text" id="lisenceNum" bind:value={empCivService.lisenceNo} class="text-lg" required>
                                    <input type="text" id="liscenceDate" bind:value={empCivService.dateofValidity} class="text-lg" required>
                                    <input type="text" id="civAction" bind:value={empCivService.Action} class="text-lg" required>
                                </div>
                            </div>
                        </div>
                        <!--Work Experience, make this into dynamic form later-->
                        <div class = "border-b-2 border-black w-auto h-auto bg-white">
                            <div class = "py-4 text-2xl font-serif">V.Work Experience</div>
                            <div class = "p-3 border-2 border-black">
                                <div class ="grid grid-cols-7 h-auto w-full overflow-x-auto pb-5">
                                    <div class = "border-2 border-black p-2">Postion Title</div>
                                    <div class = "border-2 border-black p-2">DEPARTMENT/ AGENCY/ OFFICE</div>
                                    <div class = "border-2 border-black p-2">MONTHLY SALARY</div>
                                    <div class = "border-2 border-black p-2">SALARY / JOB / PAY GRADE</div>
                                    <div class = "border-2 border-black p-2">STATUS OF APPOINTMENT</div>
                                    <div class = "border-2 border-black p-2">GOV'T SERVICE</div>
                                    <div class = "border-2 border-black p-2">ACTION</div>
                                    <input type="text" id="prevPosTitle" bind:value={empWorkExperience.positionTitle} class="text-lg" required>
                                    <input type="text" id="prevDepartment" bind:value={empWorkExperience.departmentAgencyOffice} class="text-lg" required>
                                    <input type="text" id="prevMonthlySalary" bind:value={empWorkExperience.monthlySalary} class="text-lg" required>
                                    <input type="text" id="prevSalaryGrade" bind:value={empWorkExperience.Salary} class="text-lg" required>
                                    <input type="text" id="prevAppointmentStatus" bind:value={empWorkExperience.statusofAppointment} class="text-lg" required>
                                    <input type="text" id="governmentService" bind:value={empWorkExperience.governmentService} class="text-lg" required>
                                    <input type="text" id="prevAction" bind:value={empWorkExperience.Action} class="text-lg" required>
                                </div>
                            </div>
                        </div>
                        <!--Page 3-->
                        <div class = "border-b-2 border-black w-auto h-auto bg-white">
                            <div class = "py-4 text-2xl font-serif">VI. Voluntary work or involvement in Civic/Non Government/ People/ Voluntary Organization/s</div>
                            <div class = "p-3 border-2 border-black">
                                <div class ="grid grid-cols-7 h-auto w-full overflow-x-auto pb-5">
                                    <div class = "border-2 border-black p-2">NAME & ADDRESS OF ORGANIZATIONS </div>
                                    <div class = "border-2 border-black p-2">INCLUSIVE DATES OF ATTENDANCE</div>
                                    <div class = "border-2 border-black p-2">FROM</div>
                                    <div class = "border-2 border-black p-2">TO</div>
                                    <div class = "border-2 border-black p-2">NUMBER OF HOURS</div>
                                    <div class = "border-2 border-black p-2">POSITION/NATURE OF WORK</div>
                                    <div class = "border-2 border-black p-2">ACTION</div>
                                    <input type="text" id="nameOfCharityOrganization" bind:value={empCharityWork.nameandAdressofOrg} class="text-lg" required>
                                    <div></div>
                                    <input type="text" id="charityAttendDateFrom" bind:value={empCharityWork.from} placeholder="dd/mm/yyyy" class="text-lg" required>
                                    <input type="text" id="charityAttendDateTo" bind:value={empCharityWork.to} placeholder="dd/mm/yyyy" class="text-lg" required>
                                    <input type="text" id="charityNumberOfHours" bind:value={empCharityWork.numberOfHours} class="text-lg" required>
                                    <input type="text" id="charityWorkNature" bind:value={empCharityWork.natureofWork} class="text-lg" required>
                                    <input type="text" id="charityAction" bind:value={empCharityWork.action} class="text-lg" required>
                                </div>
                            </div>
                        </div>
                        <div class = "border-b-2 border-black w-auto h-auto bg-white">
                            <div class = "py-4 text-2xl font-serif">VII. LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS ATTENDED</div>
                            <div class = "p-3 border-2 border-black">
                                <div class ="grid grid-cols-8 h-auto w-full overflow-x-auto pb-5">
                                    <div class = "border-2 border-black p-2">TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/ TRAINING PROGRAMS </div>
                                    <div class = "border-2 border-black p-2">INCLUSIVE DATES OF ATTENDANCE</div>
                                    <div class = "border-2 border-black p-2">FROM</div>
                                    <div class = "border-2 border-black p-2">TO</div>
                                    <div class = "border-2 border-black p-2">NUMBER OF HOURS</div>
                                    <div class = "border-2 border-black p-2">TYPE OF L&D</div>
                                    <div class = "border-2 border-black p-2">CONDUCTED/ SPONSORED BY</div>
                                    <div class = "border-2 border-black p-2">Action</div>
                                    <input type="text" id="ldProgram" bind:value={empLearningAndDevelopment.trainingPrograms} class="text-lg">
                                    <div></div>
                                    <input type="text" id="ldAttendDateFrom" bind:value={empLearningAndDevelopment.to} placeholder = "dd/mm/yyyy" class="text-lg" required>
                                    <input type="text" id="ldAttendDateTo" bind:value={empLearningAndDevelopment.from} placeholder = "dd/mm/yyyy" class="text-lg" required>
                                    <input type="text" id="ldNumberofHours" bind:value={empLearningAndDevelopment.numberofHours} class="text-lg" required>
                                    <input type="text" id="ldType" bind:value={empLearningAndDevelopment.type} class="text-lg" required>
                                    <input type="text" id="ldConducted" bind:value={empLearningAndDevelopment.conductedBy} class="text-lg" required>
                                    <input type="text" id="ldAction" bind:value={empLearningAndDevelopment.action} class="text-lg" required>
                                </div>
                            </div>
                        </div>
                        <!--page 4-->
                        <div class = "border-b-2 border-black w-auto h-auto">
                            <div class = "py-4 text-2xl font-serrif">Attachments</div>
                            <div class = "grid grid-cols-3 h-auto w-full overflow-x-auto pb-5 border-2 border-black">
                                <div class = "border-2 border-black p-2 text-center">FILE TITLE</div>
                                <div class = "border-2 border-black p-2 text-center">FILE UPLOAD</div>
                                <div class = "border-2 border-black p-2 text-center">ACTION</div>
                                <label for ="fileName" class = "border-2 border-black p-2"></label>
                                <div class = "border-2 border-black p-2">
                                    <input type="file" id="emp_file_upload" name = "emp_file_upload" bind:value={emp_file} required>
                                </div>
                                <input type="text" id="fileUploadAction" placeholder="Not functional" class="text-lg">
                            </div>
                        </div>
                        <div class = "p-6 h-auto w-full grid grid-cols-8">
                            <button
                            type="button"
                            class="inline-flex justify-center absolute-left-0 px-4 py-2 text-sm font-medium text-black bg-red-500 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            on:click={handleClose}
                            >
                            Close
                        </button>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <button
                        type = "submit"
                        class = "inline-flex justify-center absolute-right-0 px-4 py-2 text-sm font-medium text-black bg-green-500 border-transparent rounded-md hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>