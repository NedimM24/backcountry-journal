import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from 'express';

export const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isLength({min: 3, max: 100}).withMessage("Name must be between 3 and 100 characters.")
        .matches(/^[a-zA-ZÀ-ÿ' -]+$/)
        .withMessage("Name can only contain letters, spaces, hyphens, and apostrophes."),
    body('userName')
        .trim()
        .notEmpty().withMessage("Username is required.")
        .isLength({min: 3, max: 100}).withMessage("Username must be between 3 and 100 characters.")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores."),
    body('email')
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isLength({min: 3, max: 100}).withMessage("Email must be between 3 and 100 characters.")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 and 128 characters.")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number."),

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