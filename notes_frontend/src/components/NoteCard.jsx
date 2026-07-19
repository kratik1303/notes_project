function NoteCard({ note, onEdit, onDelete, onPin, darkMode }) {
  return (
    <div
      className={`rounded-xl shadow-lg p-5 transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Title + Pin */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{note.title}</h2>

        {note.pinned && (
          <span className="text-2xl" title="Pinned">
            📌
          </span>
        )}
      </div>

      {/* Content */}
      <p
        className={`mt-2 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {note.content}
      </p>

      {/* Created Date */}
      <p
        className={`text-sm mt-3 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        📅 Created:{" "}
        {note.createdAt
          ? new Date(note.createdAt).toLocaleDateString()
          : "No Date"}
      </p>

      {/* Updated Date */}
      {note.updatedAt && (
        <p className="text-sm text-blue-500">
          ✏️ Updated:{" "}
          {new Date(note.updatedAt).toLocaleString()}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-5 flex gap-3 flex-wrap">

        <button
          onClick={() => onEdit(note)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onPin(note.id)}
          className={`px-4 py-2 rounded-lg transition ${
            note.pinned
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }`}
        >
          {note.pinned ? "📌 Unpin" : "⭐ Pin"}
        </button>

        <button
          onClick={() => onDelete(note)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          🗑 Delete
        </button>

      </div>
    </div>
  );
}

export default NoteCard;