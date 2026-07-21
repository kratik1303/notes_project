import Note from "../models/Note.js";

// Get All Notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
    }).sort({
      pinned: -1,
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch notes",
      error: error.message,
    });
  }
};

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
      pinned: false,
    });

    res.status(201).json({
      message: "Note Created",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create note",
      error: error.message,
    });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        content,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note Updated Successfully",
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update note",
      error: error.message,
    });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete note",
      error: error.message,
    });
  }
};

// Toggle Pin
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.pinned = !note.pinned;

    await note.save();

    res.status(200).json({
      message: "Pin status updated",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update pin",
      error: error.message,
    });
  }
};
