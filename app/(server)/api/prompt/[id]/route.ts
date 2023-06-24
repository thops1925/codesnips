import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type body = {
	prompt: string;
	tag: string;
};

// search
export async function GET(req: Request, { params }: any) {
	try {
		const prompt = await prisma.prompt.findUnique({
			where: { id: params.id },
			include: { creator: true },
		});

		if (!prompt) {
			return new Response('Prompt not found', { status: 404 });
		}

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		console.log(error);
	}
}
// update
export async function PATCH(req: Request, { params }: any) {
	const body: body = await req.json();
	const { prompt, tag } = body;

	try {
		const exist = await prisma.prompt.findUnique({
			where: { id: params.id },
		});

		if (!exist) {
			return new Response('Prompt not found', { status: 404 });
		}

		const updatedPrompt = await prisma.prompt.update({
			where: { id: params.id },
			data: { prompt, tag },
		});

		return new Response(JSON.stringify(updatedPrompt), { status: 200 });
	} catch (error) {
		console.log(error);
	}
}

// delete
export async function DELETE(req: Request, { params }: any) {
	try {
		await prisma.prompt.delete({
			where: { id: params.id },
			include: { creator: true },
		});
		return new Response('Prompt Deleted', { status: 200 });
	} catch (error) {
		console.log(error);
	}
}
