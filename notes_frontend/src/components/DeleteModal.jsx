function DeleteModal({ note, onClose, onConfirm, darkMode }) {
  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`w-96 rounded-xl p-6 shadow-2xl transition-all duration-300 ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold">
          🗑 Delete Note
        </h2>

        <p
          className={`mt-3 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            "{note.title}"
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(note.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;