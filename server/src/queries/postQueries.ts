import { prisma } from "../config/prisma";
import { User } from "../generated/prisma/client";
import { DateTimeFieldRefInput } from "../generated/prisma/internal/prismaNamespace";

//CREATE
export async function createPostQuery(
    title: string, 
    bodyText: string,
    coverImage: string,
    category: string,
    isPublished: boolean,
    authorId: number
    ){
    const post = await prisma.post.create({
        data: {
            title,
            bodyText,
            coverImage,
            category,
            isPublished,
            authorId
        }
    });
    return post;
}

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

export async function getPostById(id: number){
    const post = await prisma.post.findUnique({
        where: {id}
    });
    return post;
}

//UPDATE
export async function updatePostQuery(
    postId: number,
    title: string, 
    bodyText: string,
    coverImage: string,
    category: string,
    isPublished: boolean,
    ){
    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title,
            bodyText,
            coverImage,
            category,
            isPublished,
        }
    });
    return post;
}

//DELETE    
export async function deletePostQuery(id: number){
    await prisma.post.delete({
        where: {id}
    });
}