import React,{useContext,useEffect} from 'react'
import noteContext from '../Context/notes/notecontext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(noteContext)
  const {notes, getNotes} =context
  useEffect(() => {
    getNotes()
  }, [])
  
  return (
    <div>
        <AddNote/>
        <div className="row my-3">
      <h1>Your Notes</h1>
      {notes.map((note)=>{
        return <NoteItem note={note} key={note._id}/>
      })}
      </div>
    </div>
  )
}

export default Notes