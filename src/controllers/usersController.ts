import { NextFunction, Request, Response } from 'express';
import handlePostUser from '../services/usersServices';
import { UsersReq } from '../interfaces/userInterfaces';
import { usersValidation } from '../validations/joiValidations';
import ValidationError from '../errors/ValidationError';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const user:UsersReq = req.body;
    try {
        const isValid = usersValidation.validate(user).error;
        if (isValid) {
            throw new ValidationError(`Your register request must follow the pattern {student, class}, so ${isValid.details[0].message}`);
        }
        const token = await handlePostUser(user);
        return res.send({ token });
    } catch (error) {
        if (error.name === 'ConflictError') return res.status(409).send(error.message);
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        return next(error);
    }
};

export default postUser;
