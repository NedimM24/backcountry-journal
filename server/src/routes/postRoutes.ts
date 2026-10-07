import express from 'express';
import { getPosts, 
         getPublishedPosts,
         getNonPublishedPosts,
         getPost,
         createPost,
         updatePost,
         deletePost
         } from '../controllers/postController';

import { verifyToken } from '../controllers/authController';
import { validateCreatePost } from '../validation/validateCreatePost';
import { validateUpdatePost } from '../validation/validateUpdatePost';
import { isAdmin } from '../middleware/isAdmin';

const postRouter = express.Router();

//CREATE
postRouter.post('/', verifyToken, isAdmin, validateCreatePost, createPost)

//READ
postRouter.get('/', verifyToken, getPosts)
postRouter.get('/published', verifyToken, getPublishedPosts)
postRouter.get('/non-published', verifyToken, isAdmin, getNonPublishedPosts)
postRouter.get('/:id', verifyToken, getPost)

//UPDATE 
postRouter.patch('/:id', verifyToken, isAdmin, validateUpdatePost, updatePost)

//DELETE
postRouter.delete('/:id', verifyToken, isAdmin, deletePost)

export default postRouter;