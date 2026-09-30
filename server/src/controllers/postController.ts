import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getAllPosts, 
         getAllPublishedPosts,
         getAllNonPublishedPosts,
         } from '../queries/postQueries';

//CREATE

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

//UPDATE

//DELETE