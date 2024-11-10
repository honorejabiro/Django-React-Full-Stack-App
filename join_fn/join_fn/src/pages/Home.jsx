import React from "react";
import { useState, useEffect } from "react";
import api from "../api.js";
import Notes from "../components/Notes.jsx"
import "../styles/Home.css"

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("")
  const fetchnotes = () => {
    api
      .get("/api/notes/")
      .then((response) => {
        console.log(response);
        setNotes(response.data);
      })
      .catch((errors) => {
        console.log(errors.message);
      });
  };

  useEffect(() => {
    fetchnotes()
    console.log(notes)
  }, [])


  const delete_note = (id) => {
    api.delete(`api/note/delete/${id}/`)
    .then(response => {
      alert(response.data.message)
      fetchnotes()
    })
    .catch(error => {
      alert("note not deleted")
    })
  }

  const create_note = (e) => {
    e.preventDefault()
    api
      .post("/api/notes/", { title, body })
      .then((response) => {
        if (response.status === 201) {
          alert("Note successfully created");
          fetchnotes();
        } else {
          alert("Failed to make note");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div>
        <h1>
          Notes
        </h1>
          {notes.map((note) => (
            <Notes note={note} onDelete={delete_note} key={note.id} />
          ))}
      </div>
      <form onSubmit={create_note}>
        <label htmlFor="title"> Title </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
        />
        <label htmlFor="conent"> Content: </label>
        <br />
        <textarea
          id="content"
          name="content"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Home;
