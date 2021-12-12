import NotFound from '../errors/NotFound';
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

export {
    handleQuestionsTags,
    handleQuestionAndAnswer,
};
