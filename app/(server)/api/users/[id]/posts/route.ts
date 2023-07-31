import prisma from "@/lib/prisma";

export const GET = async (request: Request, { id }: any) => {
    try {
        const prompts = await prisma.post.findMany({
            where: { id: id },
            include: { users: true },
        });

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts created by user', { status: 500 });
    }
};
