import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const db = await clientPromise();
	const Loan = db.collection('Loans');

    const response = await Loan.updateOne(
        { _id: data._id }, 
        { $set: {
            code: data.code,
            description: data.description,
			comments: data.comments,
			
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
