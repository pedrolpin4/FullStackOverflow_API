import connection from '../database';
import {
    DbQuestion, DbQuestionAnswered,
    QuestionReq, Tags,
} from '../interfaces/questionInterfaces';
import { DbUser } from '../interfaces/userInterfaces';

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
    let result = await connection.query(`SELECT questions.question, questions.student, questions.class, questions.answered,
        questions.submit_at as "submitAt", tags.name as tags FROM questions 
        JOIN tags ON questions.tag_id = tags.id WHERE questions.id = $1`, [id]);

    if (result.rows[0].answered) {
        result = await connection.query(`SELECT questions.question, questions.score, questions.student, questions.class, tags.name as tags, 
            questions.answered, questions.submit_at as "submitAt", answers.answered_at as "answeredAt", students.name as "answeredBy", answers.answer
            FROM questions JOIN answers ON questions.id = answers.question_id JOIN tags ON questions.tag_id = tags.id 
            JOIN students ON answers.answered_by = students.id WHERE questions.id = $1`, [id]);
    }
    return result.rows[0];
};

const selectAllNotAnsweredQuestions = async ():Promise<DbQuestion[]> => {
    const result = await connection.query(`SELECT id, question, student, class, submit_at as "submitAt" 
        FROM questions WHERE answered = 'f' `);
    return result.rows;
};

const selectUserByToken = async (token:string):Promise<DbUser> => {
    const result = await connection.query('SELECT * FROM students WHERE token = $1', [token]);
    return result.rows[0];
};

const insertAnswer = async (answer:string, userId:number, questionId:number) => {
    await connection.query(
        "UPDATE questions SET answered = 't' WHERE id = $1",
        [questionId],
    );
    await connection.query(
        'INSERT INTO answers (answer, answered_by, question_id) VALUES ($1, $2, $3)',
        [answer, userId, questionId],
    );
};

const selectScoreByQuestionId = async (id: number): Promise<number> => {
    const result = await connection.query('SELECT score FROM questions WHERE id = $1', [id]);
    return result.rows[0].score;
};

const updateQuestionsScore = async (questionId: number, newScore: number) => {
    console.log(newScore);
    await connection.query('UPDATE questions SET score = $1 WHERE id = $2', [newScore, questionId]);
};

export {
    insertQuestion,
    insertTags,
    selectAllNotAnsweredQuestions,
    selectQuestionById,
    selectUserByToken,
    insertAnswer,
    updateQuestionsScore,
    selectScoreByQuestionId,
};
