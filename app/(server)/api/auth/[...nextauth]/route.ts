import GitHubProvider from 'next-auth/providers/github';
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };