import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from 'next-auth/adapters';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {


    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    adapter: PrismaAdapter(prisma),

    callbacks: {

        async session({ session }) {
            // // store the user id from MongoDB to session
            // const sessionUser = await User.findOne({ email: session.user.email });
            // session.user.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ user }: { user: AdapterUser | User }) {

            // console.log(user)
            // return true
            try {
                const userExists = await prisma.user.findUnique({ where: { email: user.email as string } });


                // if (!userExists) {
                //     await prisma.user.create({
                //         data: {
                //             username: user.name as string,
                //             email: user.email as string,
                //             image: user.image as string
                //         }
                //     })
                // }
                return true;

            } catch (error) {
                console.log(error)
                return false
            }
        },
    },
};


export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session;
}

