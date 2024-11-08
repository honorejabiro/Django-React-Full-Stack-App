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
  return (
    <div>
      Homre
    </div>
  )
}

export default Home
