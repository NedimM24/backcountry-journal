import { prisma } from "../config/prisma";

export async function getAllPosts(){
    const posts = await prisma.post.findMany();
    return posts;
}