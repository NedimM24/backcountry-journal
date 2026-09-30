import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { createUserQuery,
         getUserQuery
 } from '../queries/userQueries';

//CREATE
export async function createUser(req: Request, res: Response){
    const {name, userName, email, password} = req.body;
    const newUser = await createUserQuery(
        name,
        userName,
        email,
        password
    );

    res.status(201).json(newUser)
}

//READ
export async function getUser(req: Request, res: Response){
    const userId = Number(req.params.id);
    const user = await getUserQuery(userId);
    res.json(user);
}

//UPDATE

//DELETE