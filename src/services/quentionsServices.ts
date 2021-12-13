import { Request } from 'express';
import ConflictError from '../errors/ConflictError';
import NotFound from '../errors/NotFound';
import Unauthorized from '../errors/Unauthorized';
import ValidationError from '../errors/ValidationError';
import * as questionsRepository from '../repositories/questionsRepositories';

const handleQuestionsTags = async (tag:string) => {
    const tags = await questionsRepository.insertTags(tag);
    return tags.id;
};

const handleQuestionAndAnswer = async (id:number) => {
    const result = await questionsRepository.selectQuestionById(id);
    if (!result) throw new NotFound('This id does not belong to any question');
    return result;
};

const verifyToken = async (req: Request) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) throw new ValidationError('You need to be logged in to answer a question');

    const user = await questionsRepository.selectUserByToken(token);

    if (!user) throw new Unauthorized('It looks like this token is not valid');

    return user;
};

const verifyAnsweredQuestion = async (id: number) => {
    const question = await questionsRepository.selectQuestionById(id);

    if (!question) throw new NotFound('This id does not belong to any question');
    if (question.answered) throw new ConflictError('This question has already been answered');

    return question;
};

const handleVotes = async (id: number, type: string) => {
    const score = await questionsRepository.selectScoreByQuestionId(id);

    if (!score) throw new NotFound('This id does not belong to any question');

    await questionsRepository.updateQuestionsScore(id, type === 'up' ? score + 1 : score - 1);
};

export {
    handleQuestionsTags,
    handleQuestionAndAnswer,
    verifyToken,
    verifyAnsweredQuestion,
    handleVotes,
};
