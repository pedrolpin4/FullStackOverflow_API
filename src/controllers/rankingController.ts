import { NextFunction, Request, Response } from 'express';
import selectRanking from '../repositories/rankingRepository';

const getRanking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ranking = await selectRanking();
        return res.send(ranking);
    } catch (error) {
        return next(error);
    }
};

export default getRanking;
