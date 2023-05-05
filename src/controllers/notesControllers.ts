import { RequestHandler } from "express"
import NoteModel from '../models/note'
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { isDefined } from "../utils/isDefined";
// import validate from "../utils/validateID";


export const getNotes:RequestHandler = async (req, res, next) => {
    const userId = req.session.id
    try {
        isDefined(userId)
        const notes = await NoteModel.find({userId: userId}).exec()
        res.status(200).json(notes)

    }catch(error){
        next(error);
    }
};

export const getSingleNote:RequestHandler = async (req, res, next)=>{
    const {id} = req.params
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Note Id")
        }
        const note = await NoteModel.findById(id).exec()
        if(!note){
            throw createHttpError(404, "Note not found")
        }
        // validate(id, res)
        

    }catch(error){
        next(error)
    }
}

interface CreateNoteBody{
    title?:string;
    text?: string
}
export const createNote:RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req, res, next)=>{
    const {title, text} = req.body
    try{
        if(!title){
            throw createHttpError(400, "Note Must have a title")
        }
        const newNote = await NoteModel.create({
            title,
            text
        })
        res.status(201).json(newNote)
    }catch(error){
        next(error);
    }
}

interface UpdateNoteParams{
    id:string
}

interface UpdateNoteBody {
    title?: string
    text?: string
}
export const updateNote:RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next)=>{
    const {id} = req.params
    const {title, text} = req.body
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Note Id")
        }
        const note = await NoteModel.findById(id).exec()
        if(!note){
            throw createHttpError(404, "Note not found")
        }
        // validate(id, res)
        if(title){
            note.title = title
        }
        if(text){
            note.text = text
        }
        const updatednote = await note.save()
        res.status(200).json(updatednote)
        
    }catch(error){
        next(error)
    }
}


export const deleteNote:RequestHandler=async(req, res, next)=>{
    const {id} = req.params
    try{
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Note Id")
        }
        const note = await NoteModel.findById(id).exec()
        if(!note){
            throw createHttpError(404, "Note not found")
        }
        await note.deleteOne()
        res.sendStatus(204)
    }catch(error){
        next(error)
    }

}