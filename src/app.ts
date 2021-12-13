import express, { Request, Response } from 'express';
import cors from 'cors';
import questionRouter from './routes/questionsRouter';
import usersRouter from './routes/usersRouter';
import rankingRouter from './routes/rankingRouter';
import serverErrorMiddleware from './middlewares/serverErrorMiddleware';

const app = express();
app.use(express.json());
app.use(cors());

app.use(serverErrorMiddleware);
app.use('/questions', questionRouter);
app.use('/users', usersRouter);
app.use('/ranking', rankingRouter);

app.get('/health', (req:Request, res:Response) => {
    res.sendStatus(200);
});

export default app;
