import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        // Connect to the database (not necessary with Prisma as it manages the connection internally)
        // await connectToDB();

        const prompts = await prisma.prompt.findMany({
            include: { creator: true },
        });
        // Fetch all prompts and include the 'creator' field

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
