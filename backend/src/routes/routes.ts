import express from "express";
import * as NotesController from "../controllers/noteController";
const router = express.Router();

router.get("/",NotesController.getNotes);

router.get("/:noteId",NotesController.getNote);

router.post("/",NotesController.createNotes);

router.patch("/:noteId",NotesController.updateNotes);

router.delete("/:noteId", NotesController.deleteNotes);

export default router;