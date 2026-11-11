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
        where: {id},
        select: {
            id: true,
            name: true,
            userName: true,
            email: true,
            role: true
        }
    })
    return user;
}

export async function getUserByEmail(email: string){
    const user = await prisma.user.findUnique({
        where: {email}
    })
    return user;
}

//UPDATE

//DELETE