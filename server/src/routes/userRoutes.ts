import express from 'express';
import { createUser,
         getUser
 } from '../controllers/userController';

const userRouter = express.Router();

//CREATE
userRouter.post('/', createUser)

//READ
userRouter.get('/:id', getUser)

//UPDATE

//DELETE

export default userRouter;