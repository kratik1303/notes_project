import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Notes API");
});

app.use("/notes", notesRouter);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
