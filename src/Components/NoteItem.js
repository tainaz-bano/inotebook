import React,{useContext} from 'react'
import noteContext from "../Context/notes/notecontext";
const NoteItem = (props) => {
    const {note}=props;
    const context = useContext(noteContext)
  const {deleteNote} =context
  return (
     <>
    <div className="col-4 my-3">
      <div className="card">
        <div className="card-body">
            <h3 className="card-title">{note.title}</h3>
            <p className="card-text">{note.description}</p>
            
            <i className="far fa-edit mx-2" ></i>
            <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default NoteItem

