import { RequestHandler } from "express";
import { getCommentByIdQuery } from "../queries/commentQueries";

export const isAdminOrCommentOwner: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const commentId = Number(req.params.id);
    const userId = res.locals.userId;
    const userRole = res.locals.userRole;

    const comment = await getCommentByIdQuery(commentId);

    if (!comment) {
      res.status(404).json({
        message: "Comment not found",
      });
      return;
    }

    if (comment.commenterId === userId || userRole === "admin") {
      next();
      return;
    }
    res.status(403).json({
      message: "Comment does not belong to you",
    });
  } catch (error) {
    next(error);
  }
};
