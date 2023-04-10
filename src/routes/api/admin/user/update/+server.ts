import clientPromise from '$lib/server/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals}: any) {
    if(!locals?.user) {
		return new Response(JSON.stringify({ messsage:'Invalid access.' }), { status: 200 });
	}
    const data  = await request.json();
    console.log(data);
    const db = await clientPromise();
    const Users = db.collection('users');

    const response = await Users.updateOne(
        { _id: data._id },
        { $set: {
                profile: data.profile,
            }
        }
    )

	if (response) {
		return new Response(
			JSON.stringify({
				status: 'Success',
				response
			})
		);
	}
}