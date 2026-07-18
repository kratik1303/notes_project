function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p className="text-gray-600 mt-2">{note.content}</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(note)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
