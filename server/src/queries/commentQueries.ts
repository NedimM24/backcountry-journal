import { prisma } from "../config/prisma";

//CREATE
export async function postCommentQuery(
    postId: number, //PpostId
    text: string,
    commenterId: number, 
){
    const comment = await prisma.comment.create({
        data: {
            text,
            commenterId,
            parentPostId: postId
        }
    });
    return comment;
}

//READ
export async function  getCommentsQuery(id: number){
    const comments = await prisma.comment.findMany({
        where: {parentPostId: id}
    });
    return comments;
}

export async function  getCommentByIdQuery(id: number){
    const comment = await prisma.comment.findUnique({
        where: {id}
    });
    return comment;
}

//UPDATE
export async function updateCommentQuery(id: number, text: string){
    const comment = await prisma.comment.update({
        where: {id},
        data: {
            text
        }
    });
    return comment
}

//DELETE
export async function deleteCommentQuery(id: number){
    await prisma.comment.delete({
        where: {id}
    });
}