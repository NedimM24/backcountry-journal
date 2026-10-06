import express from 'express';
import { createUser,
         getUser
 } from '../controllers/userController';

import { validateCreateUser } from '../validation/validateCreateUser';

const userRouter = express.Router();

//CREATE
userRouter.post('/', validateCreateUser, createUser)

//READ
userRouter.get('/:id', getUser)

//UPDATE

//DELETE

export default userRouter;