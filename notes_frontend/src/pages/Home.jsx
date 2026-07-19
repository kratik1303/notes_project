import { useEffect, useState } from "react";
import API from "../services/api";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

function Home() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (note) => {
    try {
      await API.post("/notes", note);
      fetchNotes();
      toast.success("Note added Successfully");
    } catch (error) {
      // console.log(error);
      toast.error("Unable to add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
      setNoteToDelete(null);
      toast.success("Note deleted");
    } catch (error) {
      // console.log(error);
      toast.error("Unable to delete note");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const togglePin = async (id) => {
    try {
      await API.put(`/notes/${id}/pin`);
      fetchNotes();
      toast.success("Pin status updated");
    } catch (error) {
      console.log(error);
      toast.error("Unable to Update pin");
    }
  };

  return (
    <>
      <div
        className={`min-h-screen py-10 transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* <h1 className="text-4xl font-bold text-center mb-8">📝 Notes AI</h1> */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">📝 Notes AI</h1>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
          {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8"> */}
          <div
            className={`rounded-xl shadow-lg p-6 mb-8 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <NoteForm
              addNote={addNote}
              editingNote={editingNote}
              setEditingNote={setEditingNote}
              fetchNotes={fetchNotes}
              darkMode={darkMode}
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder=" Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // className=" w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              className={`w-full p-3 border rounded-lg shadow-sm
focus:outline-none focus:ring-2 focus:ring-blue-500 transition
${
  darkMode
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-black placeholder-gray-500"
}`}
            />
          </div>
          <div className="space-y-4">
            {/* <div className="space-y-4"> */}
            {sortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={setEditingNote}
                onDelete={setNoteToDelete}
                onPin={togglePin}
                darkMode={darkMode}
              />
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>
      <DeleteModal
        note={noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={deleteNote}
        darkMode={darkMode}
      />
    </>
  );
}

export default Home;
