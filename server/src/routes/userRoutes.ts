import express from 'express';
import { createUser,
         getUser
 } from '../controllers/userController';

import { validateCreateUser } from '../validation/validateCreateUser';
import { verifyToken } from '../controllers/authController';

const userRouter = express.Router();

//CREATE
userRouter.post('/', validateCreateUser, createUser)

//READ
userRouter.get('/:id', verifyToken, getUser)

//UPDATE

//DELETE

export default userRouter;