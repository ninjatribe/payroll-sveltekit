import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function GET({request, locals}: any) {
    const db = await clientPromise();
    const Division = db.collection('divisions');

    const response = await Division.find({}).toArray();

    if(response) {
        return new Response(
            JSON.stringify({
                status: 'Success',
                response
            })
        )
    }
}