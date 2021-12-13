import connection from '../database';
import { Ranking } from '../interfaces/ranking';

const selectRanking = async (): Promise<Ranking[]> => {
    const result = await connection.query(`SELECT students.name, COUNT(*) as answers, SUM(questions.score) as points FROM questions 
        JOIN answers ON questions.id = answers.question_id 
        JOIN students ON students.id = answers.answered_by GROUP BY students.name
        ORDER BY points DESC;
    `);

    return result.rows;
};

export default selectRanking;
