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
      createdAt: new Date().toISOString(),
      pinned: false,
    };
    notes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

    res.status(201).json({
      message: "Note Created",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create Note",
    });
  }
};

export const deleteNote = (req, res) => {
  try {
    const id = Number(req.params.id);
    const notes = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updatedNotes = notes.filter((note) => note.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updatedNotes, null, 2));
    res.status(200).json({
      message: "Node deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete note",
    });
  }
};

export const updateNote = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const notes = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title,
          content,
          updatedAt: new Date().toISOString(),
        };
      }
      return note;
    });
    fs.writeFileSync(filePath, JSON.stringify(updatedNotes, null, 2));
    res.status(200).json({
      message: "Note Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update notes Successfully",
    });
  }
};

export const togglePin = (req,res) =>{
  try{
    const id = Number(req.params.id);
    const notes = JSON.parse(fs.readFileSync(filePath,'utf-8'))
    const updatedNotes = notes.map((note)=>{
      if(note.id === id)
      {
        return{
          ...note,
          pinned :!note.pinned,
        }
      }
      return note; 
    })
    fs.writeFileSync(filePath,JSON.stringify(updatedNotes,null,2))
    res.status(200).json({
      message : "Pin status updated",
    })
  }
  catch(error){
    res.status(500).json({
      message : "Unable to update the pin",
      error : error.message,
    })
  }
}
