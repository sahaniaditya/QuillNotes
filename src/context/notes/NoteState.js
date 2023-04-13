import React, { useState } from "react";
import NoteContext from "./NoteContext.js";

const NoteState = (props) => {
  var host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //Add a Note
  const addNote = async (note) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    var json = await response.json();
    console.log(json);
    setNotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call:Fetch with headers

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = response.json();

    //Logic to update the note
    for (var i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes: notes,
        setNotes: setNotes,
        addNote: addNote,
        deleteNote: deleteNote,
        getAllNotes: getAllNotes,
        editNote: editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
