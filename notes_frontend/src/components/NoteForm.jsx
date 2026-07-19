import { useState } from "react";
import API from "../services/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

function NoteForm({
  addNote,
  editingNote,
  setEditingNote,
  fetchNotes,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // addNote({
    //   title,
    //   content,
    // });
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is Required");
      return;
    }
    setError("");
    try {
      if (editingNote) {
        await API.put(`/notes/${editingNote.id}`, {
          title,
          content,
        });
        fetchNotes();
        setEditingNote(null);
        toast.success("Note Updated Successfully");
      } else {
        addNote({
          title,
          content,
        });
      }

      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded-lg">{error}</p>
      )}

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        // className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-black"
        }`}
      />

      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError("");
        }}
        rows="5"
        // className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-black"
        }`}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={() => {
              setEditingNote(null);
              setTitle("");
              setContent("");
              setError("");
            }}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
