import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function GET({request, locals}: any) {
    const db = await clientPromise();
    const Employees = db.collection('employees');

    const response = await Employees.find({}).toArray();

    if(response) {
        return new Response(
            JSON.stringify({
                status: 'Success',
                response
            })
        )
    }
}