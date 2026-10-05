import type { Request, Response } from 'express';
import { getCommentsQuery,
         postCommentQuery,
 } from '../queries/commentQueries';

 //CREATE
 export async function postComment(req: Request, res: Response){
    const postId = Number(req.params.id);
    const text = req.body.text;
    let commenterId = res.locals.userId;
    let comment = await postCommentQuery(postId, text, commenterId );

    res.status(201).json(comment);
 }

 //READ
 export async function getComments(req: Request, res: Response){
    const postId = Number(req.params.id);
    const comments = await getCommentsQuery(postId);
   
    res.json(comments);
 }

 //UPDATE

 //DELETE

 