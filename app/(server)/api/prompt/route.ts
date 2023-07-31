
import prisma from "@/lib/prisma";
export async function GET() {
    try {
        const prompts = await prisma.post.findMany({
            include: { users: true },
        });

        if (!prompts.length) {
            return new Response('No prompts found', { status: 404 });
        }
        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes

        return new Response('Failed to fetch all prompts', { status: 500 });
    }
}
