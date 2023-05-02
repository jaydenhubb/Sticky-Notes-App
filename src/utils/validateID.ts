// import NoteModel from '../models/note'
// import createHttpError from "http-errors";
// import mongoose from "mongoose";
// import { Response } from 'express';

// const validate = async (id:string, res:Response)=>{
//     if(!mongoose.isValidObjectId(id)){
//         throw createHttpError(400, "Invalid Note Id")
//     }
//     const note = await NoteModel.findById(id).exec()
//     if(!note){
//         throw createHttpError(404, "Note not found")
//     }
//     res.status(200).json(note)

// }

// export default validate