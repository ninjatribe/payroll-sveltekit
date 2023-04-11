import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const db = await clientPromise();
	const subloan = db.collection('Subloan');

    const response = await subloan.deleteOne(
        { _id: data._id }, 
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
