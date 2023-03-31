import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }: any) {
	const data = await request.json();
	const db = await clientPromise();
	const Leave = db.collection('Leaves');

    const response = await Leave.updateOne(
        { _id: data._id }, 
        { $set: {
            code: data.code,
            description: data.description,
			grouptype: data.grouptype,
			datetype: data.datetype,
			maxday: data.maxday,
			dbfiling: data.dbfiling
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
