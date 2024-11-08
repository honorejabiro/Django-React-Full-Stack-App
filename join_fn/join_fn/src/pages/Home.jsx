import React from 'react'
import {useState, useEffect} from "react";
import api from "../api.js"
const Home = () => {
  const [notes, setNotes] = useState([])
  useEffect( () => {
    const fetchnotes = () => {
      api.get("api/notes/")
    .then(response => {
      console.log(response)
      setNotes(response.data)
    })
    .catch(errors => {
      console.log(errors.message)
    })
    }
    fetchnotes()
  }
  ,[])
  const delete_note = (id) => {
    api.delete(`api/note/delete/${id}`)
    .then(response => {
      if (response.status === 204){
        alert("Note succefully deleted")
      }
      else{
        alert("Note not deleted")
      }
      console.log(response.message)
    })
    .catch(errors => {
      console.log(errors.message)
    })
    fetchnotes()
  }

  const create_note = (title, body, category) => {
    api.post("api/notes/", {title, body, category})
    .then(response => {
      if(response === 200){
        alert("Note successfully created")
      }
      else{
        alert("Note not created")
      }
    })
    .catch(error => {
      console.log(error.message)
    })
    fetchnotes()
  }
  return (
    <div>
      Homre
    </div>
  )
}

export default Home
