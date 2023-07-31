
import prisma from "@/lib/prisma";

export const fetchAll = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                users: true, // Fix the relation field name to 'user'
            },
        });
        if (!posts.length) return 'no record found'
        return posts
    } catch (error) {

    }
};

export const getSession = async () => {
    try {
        const sessions = await prisma.session.findMany({});
        return sessions;
    } catch (error) {
        // Handle the error appropriately, you can log it or rethrow the error for further investigation
        console.error('Error fetching sessions:', error);
        throw error;
    }
};

export const fetchUserFile = async (id: string) => {
    try {
        const posts = await prisma.post.findUnique({
            where: {
                id
            }, include: {
                users: true
            }
        });
        return posts
    } catch (error) {
        console.error('Error fetching user file:', error);
        throw error;
    }
};