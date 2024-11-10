import React from 'react'
import "../styles/Note.css"

const Notes = ({note, onDelete}) => {
    const formatteDate = new Date(note.created_at).toLocaleDateString("en-US")
  return (
    <div className='note-container'>
        <p className='note-title'>{note.title}</p>
        <p className='note-content'>{note.body}</p>
        <p className='note-detail'>{formatteDate}</p>
        <button className='delete-button' onClick={() => onDelete(note.id)}>
            Delete
        </button>
    </div>
  )
}

export default Notes
