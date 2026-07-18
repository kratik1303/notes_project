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

  useEffect(() => {
    fetchNotes();
  }, []);

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
      toast.success("Note added Successfully")
    } catch (error) {
      // console.log(error);
      toast.error("Unable to add note")
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
      setNoteToDelete(null);
      toast.success("Note deleted")
    } catch (error) {
      // console.log(error);
      toast.error("Unable to delete note")
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">📝 Notes AI</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <NoteForm
              addNote={addNote}
              editingNote={editingNote}
              setEditingNote={setEditingNote}
              fetchNotes={fetchNotes}
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder=" Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={setEditingNote}
                  onDelete={setNoteToDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        note={noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={deleteNote}
      />
    </>
  );
}

export default Home;
