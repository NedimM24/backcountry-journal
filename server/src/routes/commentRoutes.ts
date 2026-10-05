import express from 'express';
import { getComments, 
         postComment,

 } from '../controllers/commentController';
import { verifyToken } from '../controllers/authController';

const commentRouter = express.Router();

//CREATE
commentRouter.post('/posts/:id/comments', verifyToken, postComment)

//READ
commentRouter.get('/posts/:id/comments', getComments)

//UPDATE

//DELETE

export default commentRouter;