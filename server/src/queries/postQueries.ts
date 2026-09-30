import { prisma } from "../config/prisma";

//CREATE

//READ
export async function getAllPosts(){
    const posts = await prisma.post.findMany();
    return posts;
}

export async function getAllPublishedPosts(){
    const publishedPosts = await prisma.post.findMany({
        where: {isPublished: true}
    });
    return publishedPosts;
}

export async function getAllNonPublishedPosts(){
    const nonPublishedPosts = await prisma.post.findMany({
        where: {isPublished: false}
    });
    return nonPublishedPosts;
}

//UPDATE

//DELETE    