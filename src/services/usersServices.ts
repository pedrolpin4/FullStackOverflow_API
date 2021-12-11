import { v4 as uuid } from 'uuid';
import ConflictError from '../errors/ConflictError';
import { UsersReq } from '../interfaces/userInterfaces';
import * as usersRepositories from '../repositories/usersRepositories';

const handlePostUser = async (user:UsersReq) => {
    const classId = await usersRepositories.selectExistentClass(user.class);
    const token = uuid();
    const isExistentUser = await usersRepositories.selectUniqueUser(user.name);
    if (isExistentUser) throw new ConflictError('This username is already in use');
    await usersRepositories.insertUser(user.name, classId, token);
    return token;
};

export default handlePostUser;
