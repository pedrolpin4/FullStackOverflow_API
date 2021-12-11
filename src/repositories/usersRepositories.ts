import connection from '../database';

const selectExistentClass = async (classroom: string): Promise<number> => {
    let result = await connection.query('SELECT * FROM classes WHERE name = $1', [classroom]);
    if (!result.rowCount) {
        result = await connection.query('INSERT INTO classes (name) VALUES ($1) RETURNING id', [classroom]);
    }
    return result.rows[0].id;
};

const selectUniqueUser = async (name:string):Promise<number> => {
    const result = await connection.query('SELECT * FROM students WHERE name = $1', [name]);
    return result.rowCount;
};

const insertUser = async (name:string, classroom:number, token:string) => {
    await connection.query('INSERT INTO students (name, class_id, token) VALUES ($1, $2, $3)', [name, classroom, token]);
};

export {
    selectExistentClass,
    insertUser,
    selectUniqueUser,
};
