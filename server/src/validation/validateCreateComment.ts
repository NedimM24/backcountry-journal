import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from 'express';

export const validateCreateComment = [
    body("text")
    .trim()
    .notEmpty().withMessage("Text is required.")
    .isLength({min: 3, max: 200}).withMessage("Comment must be between 3 and 200 characters."),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    }
]