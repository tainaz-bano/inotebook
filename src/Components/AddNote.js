import React,{useContext,useState} from "react";
import noteContext from "../Context/notes/notecontext";
export default function AddNote () {
    const context = useContext(noteContext)
  const {addNote} =context
    const [note, setNote] = useState({title: "", description: "", tag: ""})
  const add = (e) =>{
      e.preventDefault()
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className="container my-3">
      <form>
        <h1>Add a Note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Add a title"
            onChange={onChange}
            minLength={5}
            value={note.title}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
            placeholder="Add your Note"
          >
            Note
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={onChange}
            minLength={5}
            value={note.description}
          ></textarea>
          <div className="my-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
        </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-4" onClick={add}>
           Add Note
          </button>
        </div>
        
      </form>
    </div>
  );
};


