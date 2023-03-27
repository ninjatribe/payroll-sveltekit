import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const db = await clientPromise();
	const Position = db.collection('positions');

	const response = await Position.deleteOne({ _id: data._id });

	if (response) {
		return new Response(
			JSON.stringify({
				status: 'Success',
				response
			})
		);
	}
}
