import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
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
