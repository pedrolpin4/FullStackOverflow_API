import NotFound from '../errors/NotFound';
import * as questionsRepository from '../repositories/questionsRepositories';

const handleQuestionsTags = async (tags:string) => {
    const tagsArray = tags.split(', ');
    return tagsArray;
};

const handleQuestionAndAnswer = async (id:number) => {
    const result = await questionsRepository.selectQuestionById(id);
    if (!result) throw new NotFound('This id does not belong to any question');
    return result;
};

export {
    handleQuestionsTags,
    handleQuestionAndAnswer,
};
