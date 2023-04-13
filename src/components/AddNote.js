import React, { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext.js";

function AddNote(props) {
  const state = useContext(NoteContext);
  const { addNote } = state;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <h1>ADD YOU NOTES</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Descripition
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            AddNote
          </button>
        </form>
      </div>
    </>
  );
}
export default AddNote;
