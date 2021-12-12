import { Request, Response, NextFunction } from 'express';
import { QuestionReq } from '../interfaces/questionInterfaces';
import * as questionsServices from '../services/quentionsServices';
import * as questionsRepositories from '../repositories/questionsRepositories';
import { questionValidator } from '../validations/joiValidations';
import ValidationError from '../errors/ValidationError';

const postQuestion = async (req:Request, res:Response, next:NextFunction) => {
    const question:QuestionReq = req.body;
    try {
        const isValid = questionValidator.validate(question).error;
        if (isValid) {
            throw new ValidationError(`Your question must follow the pattern {student, class, tags, question}, so ${isValid.details[0].message}`);
        }
        const dbQuestion:number = await questionsRepositories.insertQuestion(question);
        await questionsServices.handleQuestionsTags(question.tags);
        return res.status(201).send(dbQuestion);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        return next(error);
    }
};

const getQuestions = async (req: Request, res:Response, next:NextFunction) => {
    try {
        const questions = await questionsRepositories.selectAllNotAnsweredQuestions();
        if (questions.length) return res.send(questions);
        return res.status(204).send("All messages've been answered");
    } catch (error) {
        return next(error);
    }
};

const getQuestionById = async (req: Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        if (!Number(id)) throw new ValidationError('The :id param must be a number');
        const questionObject = await questionsServices.handleQuestionAndAnswer(Number(id));
        return res.send(questionObject);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'NotFound') return res.status(404).send(error.message);
        return next(error);
    }
};

export {
    postQuestion,
    getQuestions,
    getQuestionById,
};
