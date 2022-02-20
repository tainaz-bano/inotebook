import React,{useContext,useState} from "react";
import noteContext from "../Context/notes/notecontext";
export default function AddNote () {
    const context = useContext(noteContext)
  const {addNote} =context
    const [note, setNote] = useState({title: "", description: "", tag: "default"})
  const add = (e) =>{
      e.preventDefault()
    addNote(note.title, note.description, note.tag);
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
          ></textarea>
          <button type="submit" className="btn btn-primary my-4" onClick={add}>
           Add Note
          </button>
        </div>
      </form>
    </div>
  );
};


