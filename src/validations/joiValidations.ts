/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const questionValidator = Joi.object({
    question: Joi.string().required(),
    student: Joi.string().required(),
    class: Joi.string().required(),
    tags: Joi.string().required(),
});

export {
    questionValidator,
};
