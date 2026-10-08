import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next): void => {
    if(res.locals.userRole === "admin"){
        next();
        return;
    } else {
        res.status(403).json({
            message: "Admin access required"
        });
    };
};