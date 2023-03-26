import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, locals }: any) {
	const db = await clientPromise();
	const user = db.collection('users');

	const response = await user.find({}).toArray();

	if (response) {
		return new Response(
			JSON.stringify({
				status: 'Success',
				response
			})
		);
	}
}
