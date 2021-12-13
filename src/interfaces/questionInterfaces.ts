export interface QuestionReq {
    question:string;
    student:string;
    class:string;
    tags:string;
}

export interface DbQuestion extends QuestionReq {
    id: number;
    answered: boolean;
    submitAt: string;
    score?: number;
}

export interface DbQuestionAnswered extends QuestionReq {
    id: number;
    answered: boolean;
    submitAt: string;
    answerBy?: number;
    answeredAt?: string;
    answer?: string;
    score?: number;
}

export interface Tags {
    id: number;
    name: string;
}
