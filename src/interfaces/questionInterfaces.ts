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

export interface Tags {
    id: number;
    name: string;
}
