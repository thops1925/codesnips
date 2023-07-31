import prisma from "@lib/prisma";


type body = {
	title: string;
	content: string;
};

// search
export async function GET(req: Request, { params }: any) {
	try {
		const prompt = await prisma.post.findUnique({
			where: { id: params.id },
			include: { users: true },
		});

		if (!prompt) {
			return new Response('Prompt not found', { status: 404 });
		}

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
	}
}
// update
export async function PATCH(req: Request, { params }: any) {
	const body: body = await req.json();
	const { title, content } = body;

	try {
		const exist = await prisma.post.findUnique({
			where: { id: params.id },
		});

		if (!exist) {
			return new Response('Prompt not found', { status: 404 });
		}

		const updatedPrompt = await prisma.post.update({
			where: { id: params.id },
			data: { title, content },
		});

		return new Response(JSON.stringify(updatedPrompt), { status: 200 });
	} catch (error) {
	}
}

// delete
export async function DELETE(req: Request, { params }: any) {
	try {
		await prisma.post.delete({
			where: { id: params.id },
			include: { users: true },
		});
		return new Response('Prompt Deleted', { status: 200 });
	} catch (error) {
	}
}
