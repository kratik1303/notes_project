function DeleteModal({ note, onClose, onConfirm }) {
  if (!note) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold">Delete Note</h2>
        <p className="mt-3 text-gray-600">
          Are you sure want to delete
          <span className="font-semibold"> "{note.title}"</span>?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
