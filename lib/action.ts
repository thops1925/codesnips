import prisma from "./prisma";


export const fetchAll = async () => {
    const posts = await prisma.post.findMany({
        include: {
            users: true, // Fix the relation field name to 'user'
        },
    });
    return posts
};

export const getSession = async () => {
    const session = await prisma.session.findMany({});
    return session

};
