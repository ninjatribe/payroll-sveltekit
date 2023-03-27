import { id } from '$lib/common/utils';
import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
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
