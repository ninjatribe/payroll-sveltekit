import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const db = await clientPromise();
	const employees = db.collection('employees');

    const response = await employees.updateOne(
        { _id: data._id }, 
        { $set: {
            emp_picture: data.emp_picture,
            empNo: data.empNo,
            empScanNo: data.empScanNo,
            empFullName: data.empFullName,
            emp_div: data.emp_div,
            emp_email: data.emp_email,
            empDateofBirth: data.empDateofBirth,
            empPlaceofBirth: data.empPlaceofBirth,
            empSex: data.empSex,
            empCivStatus: data.empCivStatus,
            empWorkExperience: data.empWorkExperience,
            empCharityWork: data.empCharityWork,
            empLearningAndDevelopment: data.empLearningAndDevelopment,
            emp_file: data.emp_fil,
        }}
    );
	if (response) {
		return new Response(
			JSON.stringify({
				status: 'Success',
				response
			})
		);
	}
}