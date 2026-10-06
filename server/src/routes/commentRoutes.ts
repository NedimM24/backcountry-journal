import express from 'express';
import { getComments, 
         postComment,
         updateComment

 } from '../controllers/commentController';
import { verifyToken } from '../controllers/authController';

const commentRouter = express.Router();

//CREATE
commentRouter.post('/posts/:id/comments', verifyToken, postComment)

//READ
commentRouter.get('/posts/:id/comments', verifyToken, getComments)

//UPDATE
commentRouter.patch('/comments/:id', verifyToken, updateComment)

//DELETE

export default commentRouter;