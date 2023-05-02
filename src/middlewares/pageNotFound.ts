import { NextFunction,Request, Response } from 'express'
import createHttpError from 'http-errors'

const notFound = (req:Request, res:Response, next:NextFunction)=>{
    next(createHttpError(404, "Page Not Found"))
}

export default notFound