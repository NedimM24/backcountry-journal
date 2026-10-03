import express from 'express';
import { getPosts, 
         getPublishedPosts,
         getNonPublishedPosts,
         getPost,
         createPost
         } from '../controllers/postController';

import { verifyToken } from '../controllers/authController';

const postRouter = express.Router();

postRouter.get('/', verifyToken, getPosts)
postRouter.get('/published', getPublishedPosts)
postRouter.get('/non-published', getNonPublishedPosts)
postRouter.get('/:id', getPost)


postRouter.post('/', verifyToken, createPost)

export default postRouter;