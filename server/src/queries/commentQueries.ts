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

//UPDATE

//DELETE