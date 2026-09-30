import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { getAllPosts } from '../queries/postQueries';

//Function that will return an array of all posts
export async function getPosts(req: Request, res: Response){
    const posts = await getAllPosts();
    res.json(posts);
}