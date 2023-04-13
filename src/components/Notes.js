import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import AddNote from "./AddNote.js";
import Noteitem from "./Noteitem.js";
import { useNavigate } from "react-router-dom";


function Notes(props) {
  const { showAlert } = props;
  let history = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const state = useContext(NoteContext);
  const message = "No notes to display";
  const { notes, getAllNotes, editNote } = state;
  
  useEffect(() => {
   
    if (localStorage.getItem("token") !== undefined) {
       
       getAllNotes();
    }
    
    else 
    history("/login");
  },[localStorage.getItem("token")]);
  const handleClick = () => {
    showAlert("Updated Successfully");
    editNote(note._id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  const handleChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      _id: currentNote._id,
      etag: currentNote.tag,
      edescription: currentNote.description,
      etitle: currentNote.title,
    });
  };
  return (
    <>
      <AddNote />

      <div className="container">
        <button
          style={{ display: "none" }}
          type="button"
          className="btn btn-primary"
          ref={ref}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Launch static backdrop modal
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Update Your Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      value={note.etitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
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
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  ref={refClose}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h3>Your Notes</h3>

        <div className="row my-3">
          {localStorage.getItem("token") &&
            (notes.length !== 0
              ? notes.map((note) => {
                  return (
                    <Noteitem
                      key={note._id}
                      note={note}
                      updateNote={updateNote}
                    />
                  );
                })
              : message)}
        </div>
      </div>
    </>
  );
}
export default Notes;
