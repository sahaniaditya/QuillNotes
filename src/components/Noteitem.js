import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext.js";


function Noteitem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      
      <div className="card my-3 mx-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={(e) => {
              e.preventDefault();
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
      
    </>
  );
}
export default Noteitem;
