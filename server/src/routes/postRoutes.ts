import express from 'express';
import { getPosts, 
         getPublishedPosts,
         getNonPublishedPosts,
         getPost,
         createPost
         } from '../controllers/postController';

import { verifyToken } from '../controllers/authController';

const postRouter = express.Router();

//CREATE
postRouter.post('/', verifyToken, createPost)

//READ
postRouter.get('/', verifyToken, getPosts)
postRouter.get('/published', getPublishedPosts)
postRouter.get('/non-published', getNonPublishedPosts)
postRouter.get('/:id', getPost)

//UPDATE

//DELETE



export default postRouter;