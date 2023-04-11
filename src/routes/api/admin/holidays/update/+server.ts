import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
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
