import fs from "fs";

const filePath = "./data/notes.json";

export const getAllNotes = (req, res) => {
  try {
    const notes = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch notes",
    });
  }
};

export const createNote = (req, res) => {
  try {
    const { title, content } = req.body;
    const notes = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    notes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

    res.status(201).json({
      message: "Note Created",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create Note"
    });
  }
};
