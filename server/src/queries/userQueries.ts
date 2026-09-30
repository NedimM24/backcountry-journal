import { prisma } from "../config/prisma";

//CREATE
export async function createUserQuery(name: string, userName: string, email: string, password: string){
    const newUser = await prisma.user.create({
        data: {
            name: name,
            userName: userName,
            email: email,
            password: password
        }
    })
    return newUser;
}

//READ
export async function getUserQuery(id: number){
    const user = await prisma.user.findUnique({
        where: {id}
    })
    return user;
}

//UPDATE

//DELETE