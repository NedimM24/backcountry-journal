import express from 'express';
import { login } from '../controllers/authController';
import { validateLogin } from '../validation/validateLogin';

const authRouter = express.Router();

authRouter.post('/login', validateLogin, login)

export default authRouter;