import connection from '../database';
import {
    DbQuestion, DbQuestionAnswered,
    QuestionReq, Tags,
} from '../interfaces/questionInterfaces';

const insertQuestion = async (question:QuestionReq, tagId:number) => {
    const result = await connection.query(
        'INSERT INTO questions (student, class, question, tag_id) VALUES ($1, $2, $3, $4) RETURNING id',
        [question.student, question.class, question.question, tagId],
    );

    return result.rows[0];
};

const insertTags = async (tag:string):Promise<Tags> => {
    const result = await connection.query('INSERT INTO tags (name) VALUES ($1) RETURNING *', [tag]);
    return result.rows[0];
};

const selectQuestionById = async (id:number):Promise<DbQuestionAnswered> => {
    let result = await connection.query(`SELECT questions.id, questions.question, questions.student, questions.class, 
        questions.submit_at as "submitAt", tags.name FROM questions 
        JOIN tags ON questions.tag_id = tags.id WHERE questions.id = $1`, [id]);

    if (result.rows[0].answered) {
        result = await connection.query(`SELECT questions.id, questions.question, questions.student, questions.class, questions.submit_at as "submitAt"
        answers.answered_at as "answeredAt", answers.answered_by as "answeredBy", answers.answer, tags.name FROM questions 
        JOIN answers ON questions.id = answers.question_id JOIN tags ON questions.tag_id = tags.id
        WHERE questions.id = $1`, [id]);
    }
    return result.rows[0];
};

const selectAllNotAnsweredQuestions = async ():Promise<DbQuestion[]> => {
    const result = await connection.query(`SELECT id, question, student, class, submit_at as "submitAt" 
        FROM questions WHERE answered = 'f' `);
    return result.rows;
};

export {
    insertQuestion,
    insertTags,
    selectAllNotAnsweredQuestions,
    selectQuestionById,
};
