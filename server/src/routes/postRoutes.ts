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

const postRouter = express.Router();

//CREATE
postRouter.post('/', verifyToken, validateCreatePost, createPost)

//READ
postRouter.get('/', verifyToken, getPosts)
postRouter.get('/published', getPublishedPosts)
postRouter.get('/non-published', getNonPublishedPosts)
postRouter.get('/:id', getPost)

//UPDATE 
postRouter.patch('/:id', verifyToken, updatePost)

//DELETE
postRouter.delete('/:id', verifyToken, deletePost)



export default postRouter;