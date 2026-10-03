import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByEmail
 } from '../queries/userQueries';

 import jwt from 'jsonwebtoken';

 export async function login(req: Request, res: Response){
    try{
        const userEmail = req.body.email;
        const password = req.body.password;

        //CHECK IF THERE IS A USER
        const user = await getUserByEmail(userEmail);
        if(!user){
            console.log("User not found");
            res.status(404).json({message: "User not found"})
            return;
        }
        
        //COMPARE THE HASHED PW
        const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                //GENERATE TOKEN
                const token = jwt.sign(
                    {
                        userId: user.id,
                        userRole: user.role
                    },
                    process.env.JWT_SECRET!
                );
                res.json({token});

                console.log('Authentication Successful;');
            } else {
                console.log('Invalid Password');
                res.status(401).json({message: "Incorrect password"})
            }
    } catch(error){
            console.log("Error durring password check", error);
    }  
 }

 //VERIFY TOKEN
 export function verifyToken(req: Request, res: Response, next: NextFunction){
    //GET AUTH HEADER VALUE
    const bearerHeader = req.headers['authorization'];
    console.log("AUTH HEADER:", bearerHeader);
    //CHECK IF BEARER IS UNDEFINED
    if(typeof bearerHeader !== 'undefined'){
        //SEPERATES THE STRING 'BEARER' AND THE ACTUAL TOKEN
        const bearer = bearerHeader.split(" ");

        const bearerToken = bearer[1];
        try {
            const decoded = jwt.verify(
                bearerToken,
                process.env.JWT_SECRET!
            ) as {
                userId: number,
                userRole: string;
            };
            console.log(decoded);

            res.locals.userId = decoded.userId;
            res.locals.userRole = decoded.userRole;

            next();
        } catch (error) {
            res.sendStatus(403)
        }
    } else {
        //FORBIDDEN
        res.sendStatus(403);
    }
 }