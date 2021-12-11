import connection from '../database';
import { QuestionReq, Tags } from '../interfaces/questionInterfaces';

const insertQuestion = async (question:QuestionReq) => {
    const result = await connection.query(
        'INSERT INTO questions (student, class, question) VALUES ($1, $2, $3) RETURNING id',
        [question.student, question.class, question.question],
    );

    return result.rows[0];
};

const selectTags = async (tag:string):Promise<Tags> => {
    let result = await connection.query('SELECT * FROM tags WHERE name = $1', [tag]);
    if (!result.rowCount) {
        result = await connection.query('INSERT INTO tags (name) VALUES ($1) RETURNING *', [tag]);
    }

    return result.rows[0];
};

export {
    insertQuestion,
    selectTags,
};
