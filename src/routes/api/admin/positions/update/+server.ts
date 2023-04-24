import clientPromise from '$lib/server/mongo';

const Error_Type = {
	data: 'data',
	invalid: 'invalid'
};
const Error_Message = {
	wrongData: 'Please enter correct info',
	missingField: 'All required fields must be filled'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const {
		code,
		postionTitle,
		postionState,
		salaryGrade,
		payGradeSteps,
		payBasis,
		plantillaItemNo,
		remarks
	} = data;

	if (
		code === '' ||
		postionTitle === '' ||
		postionState === '' ||
		salaryGrade === '' ||
		payGradeSteps === '' ||
		payBasis === '' ||
		plantillaItemNo === '' ||
		remarks === ''
	) {
		return new Response(
			JSON.stringify({
				error: true,
				errorType: Error_Type.data,
				errorMessage: Error_Message.missingField
			}),
			{ status: 400 }
		);
	}

	const db = await clientPromise();
	const Position = db.collection('positions');

	const response = await Position.updateOne(
		{ _id: data._id },
		{
			$set: {
				code: data.code,
				postionTitle: data.postionTitle,
				postionState: data.postionState,
				salaryGrade: data.salaryGrade,
				payGradeSteps: data.payGradeSteps,
				payBasis: data.payBasis,
				vacancy: data.vacancy,
				plantillaItemNo: data.plantillaItemNo,
				remarks: data.remarks
			}
		}
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
