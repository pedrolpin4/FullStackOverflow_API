export interface QuestionReq {
    question:string;
    student:string;
    class:string;
    tags:string;
}

export interface DbQuestion extends QuestionReq {
    id: number;
    answered: boolean;
    answer_id: null;
    submit_at: Date;
}

export interface DbQuestionAnswered extends QuestionReq {
    id: number;
    answered: boolean;
    answer_id: any;
    submit_at: Date;
    answer_by?: number;
    answer_at?: Date;
    answer?: string;
}

export interface Tags {
    id: number;
    name: string;
}
