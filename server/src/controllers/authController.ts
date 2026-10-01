import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByEmail
 } from '../queries/userQueries';

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
                console.log('Authentication Successful;');
                res.status(200).json({message: "Successful authentication"})
            } else {
                console.log('Invalid Password');
                res.status(401).json({message: "Incorrect password"})
            }
    } catch(error){
            console.log("Error durring password check", error);
    }  
 }