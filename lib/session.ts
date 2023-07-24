import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from 'next-auth/adapters';
import { getServerSession } from "next-auth/next";
import prisma from './prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],

    adapter: PrismaAdapter(prisma),

    callbacks: {
        async session({ session, user }) {
            // If you want to store the user ID from Prisma to the session
            if (user) {
                session.user.id = user.id;
            }
            return session;
        },

        async signIn({ user }: { user: AdapterUser | User }) {
            console.log(user)
            try {
                const userExists = await prisma.user.findUnique({ where: { email: user.email as string } });
                if (!userExists) {
                    await prisma.user.create({
                        data: {
                            username: user.name as string,
                            email: user.email as string,
                            image: user.image as string
                        }
                    })
                }

                return true;

            } catch (error: any) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    },
};


export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session;
}



