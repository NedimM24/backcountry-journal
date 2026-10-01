import express from 'express';
import postRouter from './postRoutes';
import userRouter from './userRoutes';
import authRouter from './authRoutes';

const router = express.Router();

//USER ROUTES
router.use('/users', userRouter)

//POSTS ROUTES
router.use('/posts', postRouter)

//AUTH ROUTES
router.use('/auth', authRouter)

export default router;