import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
import { getServerSession } from "next-auth/next"
import prisma from './prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.Github_client!,
            clientSecret: process.env.Github_secret!,
        }),
    ],
};


export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session;
}


