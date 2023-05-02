import express from 'express'
import * as NotesController from '../controllers/notesControllers'

const router = express.Router()

router.get('/', NotesController.getNotes );
router.get('/:id', NotesController.getSingleNote);
router.post ('/', NotesController.createNote );
router.patch ('/:id', NotesController.updateNote );
router.delete('/:id', NotesController.deleteNote );

export default router