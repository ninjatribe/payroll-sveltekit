import clientPromise from '$lib/server/mongo';

const Error_Type = {
	data: 'data',
	invalid: 'invalid'
};
const Error_Message = {
	wrongData: 'Please enter info correctly',
	timeRequired: 'Time is required',
	missingField: 'All required fields must be filled'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const { holidayType, date, time } = data;

	if (holidayType === '' || date === '') {
		return new Response(
			JSON.stringify({
				error: true,
				errorType: Error_Type.data,
				errorMessage: Error_Message.missingField
			}),
			{ status: 400 }
		);
	}

	if (holidayType === 'Work Suspension' && time === '') {
		return new Response(
			JSON.stringify({
				error: true,
				errorType: Error_Type.data,
				errorMessage: Error_Message.timeRequired
			}),
			{ status: 400 }
		);
	}
	const db = await clientPromise();
	const Holidays = db.collection('holidays');

	const response = await Holidays.updateOne(
		{ _id: data._id },
		{
			$set: {
				date: data.date,
				description: data.description,
				time: data.time,
				holidayType: data.holidayType
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
