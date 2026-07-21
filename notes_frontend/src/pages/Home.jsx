import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();

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
      toast.error("Unable to fetch notes");
    }
  };

  const addNote = async (note) => {
    try {
      await API.post("/notes", note);
      fetchNotes();
      toast.success("Note added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add note");
    }
  };

  const deleteNote = async (_id) => {
    try {
      await API.delete(`/notes/${_id}`);
      fetchNotes();
      setNoteToDelete(null);
      toast.success("Note deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete note");
    }
  };

  const togglePin = async (_id) => {
    try {
      await API.put(`/notes/${_id}/pin`);
      fetchNotes();
      toast.success("Pin status updated");
    } catch (error) {
      console.log(error);
      toast.error("Unable to update pin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out Successfully");
    navigate("/login", { replace: true });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  return (
    <>
      <div
        className={`min-h-screen py-10 transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">📝 Notes AI</h1>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Note Form */}
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

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
            />
          </div>

          {/* Notes */}
          <div className="space-y-4">
            {sortedNotes.length > 0 ? (
              sortedNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={setEditingNote}
                  onDelete={setNoteToDelete}
                  onPin={togglePin}
                  darkMode={darkMode}
                />
              ))
            ) : (
              <div
                className={`text-center p-10 rounded-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold">
                  📝 No Notes Found
                </h2>

                <p className="mt-2 text-gray-500">
                  Create your first note to get started.
                </p>
              </div>
            )}
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