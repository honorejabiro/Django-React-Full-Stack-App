import React from "react";
import { useState, useEffect } from "react";
import api from "../api.js";
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
  }, [])


  const delete_note = (id) => {
    api
      .delete(`/api/note/delete/${id}`)
      .then((response) => {
        if (response.status === 204) {
          alert("Note succefully deleted");
          fetchnotes();
        } else {
          alert("Note not deleted");
        }
        console.log(response.message);
      })
      .catch((errors) => {
        console.log(errors.message);
      });
  };

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
      </div>
      <h2></h2>
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
