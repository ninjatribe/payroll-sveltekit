import { id } from '$lib/common/utils';
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
	data._id = id();
	data.status = true;

	const response = await Position.insertOne(data);
	if (response) {
		return new Response(
			JSON.stringify({
				status: 'Success',
				response
			})
		);
	}
}
