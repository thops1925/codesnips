import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request) => {
	const { userId, prompt, tag } = await request.json();

	try {
		const newPrompt = await prisma.prompt.create({
			data: {
				creator: {
					connect: { id: userId }
				},
				prompt,
				tag
			},
		});

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to create prompt', { status: 500 });
	}
};
