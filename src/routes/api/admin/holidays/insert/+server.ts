import { id } from '$lib/common/utils';
import clientPromise from '$lib/server/mongo';
import { descriptors } from 'chart.js/dist/core/core.defaults';

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
	data._id = id();
	data.status = true;

	const response = await Holidays.insertOne(data);
	if (response) {
		return new Response(
			JSON.stringify({
				status: 'Success',
				response
			})
		);
	}
}
