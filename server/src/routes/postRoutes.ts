import express from 'express';
import { getPosts, 
         getPublishedPosts,
         getNonPublishedPosts,
         getPost
         } from '../controllers/postController';

const postRouter = express.Router();

postRouter.get('/', getPosts)
postRouter.get('/published', getPublishedPosts)
postRouter.get('/non-published', getNonPublishedPosts)
postRouter.get('/:id', getPost)

export default postRouter;