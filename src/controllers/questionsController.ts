import { Request, Response, NextFunction } from 'express';
import { QuestionReq } from '../interfaces/questionInterfaces';
import * as questionsServices from '../services/quentionsServices';
import * as questionsRepositories from '../repositories/questionsRepositories';
import { questionValidator } from '../validations/joiValidations';

/* eslint-disable import/prefer-default-export */
const postQuestion = async (req:Request, res:Response, next:NextFunction) => {
    const question:QuestionReq = req.body;
    try {
        const isValid = questionValidator.validate(question).error;
        if (isValid) {
            return res
                .status(400)
                .send(`Your question must follow the pattern {student, class, tags, question}, so ${isValid.details[0].message}`);
        }
        const dbQuestion:number = await questionsRepositories.insertQuestion(question);
        const dbTags = await questionsServices.handleQuestionsTags(question.tags);
        console.log(dbTags);
        return res.status(201).send(dbQuestion);
    } catch (error) {
        return next(error);
    }
};

export {
    postQuestion,
};
