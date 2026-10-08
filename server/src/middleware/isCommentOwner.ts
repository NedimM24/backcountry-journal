import { RequestHandler } from "express";
import { getCommentByIdQuery } from "../queries/commentQueries";

export const isCommentOwner: RequestHandler = async (req, res, next): Promise<void> => {

    const commentId = Number(req.params.id);
    const userId = res.locals.userId;

    const comment = await getCommentByIdQuery(commentId);

    if(!comment){
        res.status(404).json({
            message: "Comment not found"
        });
        return;;
    }

    if(comment.commenterId === userId){
        next();
        return;
    } else {
        res.status(403).json({
            message: "Comment does not belong to you"
        });
    };
};