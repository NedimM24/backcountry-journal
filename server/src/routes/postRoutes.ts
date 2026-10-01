import express from 'express';
import { getPosts, 
         getPublishedPosts,
         getNonPublishedPosts,
         getPost
         } from '../controllers/postController';

import { verifyToken } from '../controllers/authController';

const postRouter = express.Router();

postRouter.get('/', verifyToken, getPosts)
postRouter.get('/published', getPublishedPosts)
postRouter.get('/non-published', getNonPublishedPosts)
postRouter.get('/:id', getPost)

export default postRouter;