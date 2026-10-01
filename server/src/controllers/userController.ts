import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import bcrypt from 'bcrypt';
import { createUserQuery,
         getUserQuery
 } from '../queries/userQueries';

//CREATE
export async function createUser(req: Request, res: Response){
    const {name, userName, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUserQuery(
        name,
        userName,
        email,
        hashedPassword
    );

    //RETURN NEW USER WITHOUT EXPOSING PW
    const userResponse = {
        id: newUser.id,
        role: newUser.role,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email
    }

    res.status(201).json(userResponse)
}

//READ
export async function getUser(req: Request, res: Response){
    const userId = Number(req.params.id);
    const user = await getUserQuery(userId);
    res.json(user);
}

//UPDATE

//DELETE