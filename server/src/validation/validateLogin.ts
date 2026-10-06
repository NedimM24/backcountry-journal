import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from 'express';

export const validateLogin = [
     body('email')
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isLength({min: 3, max: 100}).withMessage("Email must be between 3 and 100 characters.")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 8, max: 128 }).withMessage("Password must be between 8 and 128 charachters."),
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