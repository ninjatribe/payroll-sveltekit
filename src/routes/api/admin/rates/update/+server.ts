import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const db = await clientPromise();
	const Rate = db.collection('rates');

    const response = await Rate.updateOne(
        { _id: data._id }, 
        { $set: {
            rates: data.rates,
            config: data.config
        }}
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
