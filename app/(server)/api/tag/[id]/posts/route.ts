// import Prompt from "@models/prompt";
// import { connectToDB } from "@app/utils/database";
// import { NextResponse } from "next/server";

import prisma from "@lib/prisma";

// export const GET = async (request: any, { params }: any) => {
//     try {
//         await connectToDB()

//         const prompts = await Prompt.findOne({ _id: params.id }).populate('creator')

//         return NextResponse.json(prompts, { status: 200 })
//     } catch (error) {
//         return new Response("Failed to fetch prompts created by user", { status: 500 })
//     }
// } 



export const GET = async (request: any, { params }: any) => {
    try {
        const prompt = await prisma.prompt.findUnique({
            where: { id: params.id },
            include: { creator: true },
        });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts created by user', { status: 500 });
    }
};
