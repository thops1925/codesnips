// import Prompt from "@models/prompt";
// import { connectToDB } from "@app/utils/database";

// export const GET = async (request: any, { params }: any) => {
//     try {
//         await connectToDB()

//         const prompts = await Prompt.find({ creator: params.id }).populate("creator")

//         return new Response(JSON.stringify(prompts), { status: 200 })
//     } catch (error) {
//         return new Response("Failed to fetch prompts created by user", { status: 500 })
//     }
// } 

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (request: any, { params }: any) => {
    try {
        const prompts = await prisma.prompt.findMany({
            where: { creatorId: params.id },
            include: { creator: true },
        });

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts created by user', { status: 500 });
    }
};
