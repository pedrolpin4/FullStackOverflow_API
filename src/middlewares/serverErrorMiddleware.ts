import { NextFunction, Request, Response } from "express";

const serverErrorMiddleware = (error:string, req:Request, res:Response, next:NextFunction) => {
    console.error('SERVER ERROR', error);
    return res.sendStatus(500);
};

export default serverErrorMiddleware;
