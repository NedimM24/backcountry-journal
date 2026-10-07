import express from 'express';
import { deleteComment, getComments, 
         postComment,
         updateComment

 } from '../controllers/commentController';
import { verifyToken } from '../controllers/authController';
import { validateCreateComment } from '../validation/validateCreateComment';
import { validateUpdateComment } from '../validation/validateUpdateComment';
import { isCommentOwner } from '../middleware/isCommentOwner';

const commentRouter = express.Router();

//CREATE
commentRouter.post('/posts/:id/comments', verifyToken, validateCreateComment, postComment)

//READ
commentRouter.get('/posts/:id/comments', verifyToken, getComments)

//UPDATE
commentRouter.patch('/comments/:id', verifyToken, isCommentOwner, validateUpdateComment, updateComment)

//DELETE
commentRouter.delete('/comments/:id', verifyToken, isCommentOwner, deleteComment)

export default commentRouter;