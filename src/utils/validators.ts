import { Request, Response, NextFunction } from 'express'
import { ValidationChain,validationResult, body } from 'express-validator'

// Generic function to validate validationChain
const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations) {
            const err = await validation.run(req);
            if (!err.isEmpty()) break;
        }
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            // If get no errors -> Move to next middleware
            // Next middleware will be responsible to store some data
            return next();
        }
        return res.status(422).json({ errors: errors.array() })
    }
}
const signupValidate =[
    body('name').notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Email is required'),
    body('password').trim().isLength({min:6}).withMessage('Password must be at least 6 characters long')
]

export { validate, signupValidate }