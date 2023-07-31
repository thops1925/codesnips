import prisma from "@lib/prisma";

export const POST = async (request: Request) => {
	const { id, title, content } = await request.json();

	try {
		const newPrompt = await prisma.post.create({
			data: {
				title,
				content,
				users: {
					connect: { id: id }
				}
			},
		});

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to create prompt', { status: 500 });
	}
};
