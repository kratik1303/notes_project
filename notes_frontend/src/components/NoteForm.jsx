import { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addNote({
      title,
      content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;