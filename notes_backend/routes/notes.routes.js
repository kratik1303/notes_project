import express from "express";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  togglePin,
} from "../controllers/notes.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllNotes);
router.post("/", protect, createNote);
router.delete("/:id", protect, deleteNote);
router.put("/:id", protect, updateNote);
router.put("/:id/pin", protect, togglePin);

export default router;
