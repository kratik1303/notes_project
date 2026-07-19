import express from "express";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  togglePin,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);
router.put("/:id/pin", togglePin);

export default router;
