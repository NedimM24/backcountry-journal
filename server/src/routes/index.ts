import express from 'express';
import postRouter from './postRoutes';
import userRouter from './userRoutes';
import authRouter from './authRoutes';
import commentRouter from './commentRoutes';

const router = express.Router();

//USER ROUTES
router.use('/users', userRouter)

//POSTS ROUTES
router.use('/posts', postRouter)

//COMMENT ROUTES
router.use('/', commentRouter)

//AUTH ROUTES
router.use('/auth', authRouter)

export default router;