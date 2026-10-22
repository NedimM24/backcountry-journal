import type { Request, Response } from 'express';
import { deleteCommentQuery, getCommentCountQuery, getCommentsQuery,
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

 //Function that will return the comments count. Used in  admin front
 export async function getCommentCount(req: Request, res: Response){
     try {
         const commentCount = await getCommentCountQuery();
         res.status(200).json({
             totalComments: commentCount,
         })
     } catch (error) {
         res.status(500).json({ message: "Failed to retrieve comment count" });
     }
 }
 

 //UPDATE
 export async function updateComment(req: Request, res: Response){
   const commentId = Number(req.params.id);
   const updatedComment = req.body.text;
   const newComment = await updateCommentQuery(commentId, updatedComment);
   res.json(newComment)
 }

 //DELETE
  export async function deleteComment(req: Request, res: Response){
   const commentId = Number(req.params.id);
   await deleteCommentQuery(commentId);
   res.sendStatus(204);
 }

 