import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.routes.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Notes API");
});

app.use("/notes", notesRouter);
app.use("/auth",authRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
