import express from 'express';
import postRouter from './postRoutes';
import userRouter from './userRoutes';

const router = express.Router();

//USER ROUTES
router.use('/users', userRouter)

//POSTS ROUTES
router.use('/posts', postRouter)


export default router;