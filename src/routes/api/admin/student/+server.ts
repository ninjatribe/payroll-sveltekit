import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function GET({request, locals}: any) {
    const db = await clientPromise();
    const Student = db.collection('students');
    const user = db.collection('users');

    const response = await Student.find({}).toArray();
    const uresponse = await user.find({}).toArray();

    if(response) {
        return new Response(
            JSON.stringify({
                status: 'Success',
                response
            })
        )
    }
    if(uresponse) {
        return new uresponse(
            JSON.stringify({
                status: 'Success',
                uresponse
            })
        )
    }
}