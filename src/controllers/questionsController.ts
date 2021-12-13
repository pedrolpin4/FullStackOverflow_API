import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
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
        const tagId = await questionsServices.handleQuestionsTags(question.tags);
        const dbQuestion:number = await questionsRepositories.insertQuestion(question, tagId);
        return res.status(201).send(dbQuestion);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        return next(error);
    }
};

const getQuestions = async (req: Request, res:Response, next:NextFunction) => {
    try {
        const questions = await questionsRepositories.selectAllNotAnsweredQuestions();
        if (!questions.length) return res.status(204).send("All messages've been answered");
        const mappedQuestion = questions.map((question) => ({
            ...question,
            submitAt: dayjs(question.submitAt).format('YYYY-MM-DD hh:mm'),
        }));
        return res.send(mappedQuestion);
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

const postAnswerByQuestionId = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        if (!Number(id)) throw new ValidationError('The :id param must be a number');
        const user = await questionsServices.verifyToken(req);
        await questionsServices.verifyAnsweredQuestion(Number(id));
        await questionsRepositories.insertAnswer(answer, user.id, Number(id));
        return res.sendStatus(201);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'Unauthorized') return res.status(401).send(error.message);
        if (error.name === 'NotFound') return res.status(404).send(error.message);
        if (error.name === 'ConflictError') return res.status(409).send(error.message);

        return next(error);
    }
};

const voteQuestion = async (req:Request, res:Response, next:NextFunction, type: string) => {
    try {
        const { id } = req.params;
        if (!Number(id)) throw new ValidationError('The :id param must be a number');
        await questionsServices.handleVotes(Number(id), type);
        return res.sendStatus(200);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).send(error.message);
        if (error.name === 'NotFound') return res.status(404).send(error.message);

        return next(error);
    }
};

const downVote = async (req:Request, res:Response, next:NextFunction) => {
    await voteQuestion(req, res, next, 'down');
};

const upVote = async (req:Request, res:Response, next:NextFunction) => {
    await voteQuestion(req, res, next, 'up');
};

export {
    postQuestion,
    getQuestions,
    getQuestionById,
    postAnswerByQuestionId,
    downVote,
    upVote,
};
