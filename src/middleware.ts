import { JWT_Password } from "./config";
import { NextFunction,Request , Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (req : Request , res : Response, next : NextFunction) =>{
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string , JWT_Password)

    if(decoded)
    {
        //@ts-ignore
        req.userId = decoded.id; //ts error comming because the req type is Request and we are adding the userId to it.
                                 // to avoid it we , used the //@ts-ignore
       next()                          
    }
    else{
        res.status(403).json({
            message : "you are not logged in"
        })
    }

}