import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getAllPosts, 
         getAllPublishedPosts,
         getAllNonPublishedPosts,
         getPostById,
         createPostQuery,
         updatePostQuery
         } from '../queries/postQueries';

//CREATE
export async function createPost(req: Request, res: Response){
    let title = req.body.title;
    let bodyText = req.body.bodyText;
    let coverImage = req.body.coverImage;
    let category = req.body.category;
    let isPublished = req.body.isPublished;
    let authorId = res.locals.userId;
    const post = await createPostQuery(
        title, 
        bodyText, 
        coverImage, 
        category, 
        isPublished, 
        authorId);
    res.json(post)
}

//READ
//Function that will return an array of ALL posts
export async function getPosts(req: Request, res: Response){
    const posts = await getAllPosts();
    res.json(posts);
}

//Function that will return an array of all PUBLISHED posts
export async function getPublishedPosts(req: Request, res: Response){
    const publishedPosts = await getAllPublishedPosts();
    res.json(publishedPosts);
}

//Function that will return an array of all NON PUBLISHED posts
export async function getNonPublishedPosts(req: Request, res: Response){
    const nonPublishedPosts = await getAllNonPublishedPosts();
    res.json(nonPublishedPosts);
}

//Function that will return a post based on id
export async function getPost(req: Request, res: Response){
    const id = Number(req.params.id);
    const post = await getPostById(id);
    res.json(post);
}

//UPDATE
export async function updatePost(req: Request, res: Response){
    let title = req.body.title;
    let bodyText = req.body.bodyText;
    let coverImage = req.body.coverImage;
    let category = req.body.category;
    let isPublished = req.body.isPublished;
    let postId = Number(req.params.id)
    const post = await updatePostQuery(
        postId,
        title, 
        bodyText, 
        coverImage, 
        category, 
        isPublished, 
        );
    res.json(post)
}

//DELETE