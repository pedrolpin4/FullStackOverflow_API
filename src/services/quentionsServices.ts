const handleQuestionsTags = async (tags:string) => {
    const tagsArray = tags.split(', ');
    return tagsArray;
};

export {
    // eslint-disable-next-line import/prefer-default-export
    handleQuestionsTags,
};
