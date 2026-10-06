import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from 'express';

export const validateCreatePost = [
    body('title')
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({min: 3, max: 50}).withMessage("Title must be between 3 and 50 characters."),
    body("bodyText")
        .trim()
        .notEmpty().withMessage("Body is required.")
        .isLength({ min: 20, max: 10000 }).withMessage("Body must be between 20 and 10,000 characters."),
    body("coverImage")
        .optional()
        .trim()
        .isURL()
        .withMessage("Cover image must be a valid URL."),
    body("category")
        .isIn(["Hiking", "Gear", "Camping", "Backpacking", ])
        .withMessage("Invalid category."),
    body("isPublished")
        .isBoolean()
        .withMessage("isPublished must be true or false.")
        .toBoolean(),
    
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