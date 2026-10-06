import type { Request, Response } from 'express';
import { getCommentsQuery,
         postCommentQuery,
         updateCommentQuery,
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
 export async function updateComment(req: Request, res: Response){
   const commentId = Number(req.params.id);
   const updatedComment = req.body.text;
   const newComment = await updateCommentQuery(commentId, updatedComment);
   res.json(newComment)
 }

 //DELETE

 