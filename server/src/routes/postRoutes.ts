import express from 'express';
import { getPosts, 
         getPublishedPosts,
         getNonPublishedPosts
         } from '../controllers/postController';

const postRouter = express.Router();

postRouter.get('/', getPosts)
postRouter.get('/published', getPublishedPosts)
postRouter.get('/non-published', getNonPublishedPosts)

export default postRouter;