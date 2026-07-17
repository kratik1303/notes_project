import express from "express";
import { getAllNotes , createNote } from "../controllers/notes.controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);

export default router;
