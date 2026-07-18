import { useEffect, useState } from "react";
import API from "../services/api";
import NoteForm from "../components/NoteForm";

function Home() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold text-center mb-8">
        📝 Notes AI
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <NoteForm
          addNote={addNote}
          editingNote={editingNote}
          setEditingNote={setEditingNote}
          fetchNotes={fetchNotes}
        />
      </div>

      <div className="space-y-4">

        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-xl font-bold">
              {note.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {note.content}
            </p>

            <div className="mt-4 flex gap-3">

              <button
                onClick={() => setEditingNote(note)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
);
}

export default Home;
