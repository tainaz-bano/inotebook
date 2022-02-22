import React, { useContext, useEffect, useRef ,useState} from "react";
import noteContext from "../Context/notes/notecontext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  let  navigator= useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      getNotes();
    }
    else{
      navigator("/login")
    }
  }, [getNotes]);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const add = (e) =>{
    e.preventDefault()
    ref.current.click();
  editNote(note.id, note.etitle, note.edescription, note.etag);
}

const onChange = (e) =>{
  setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <div className="mt-5">
      <div className="my-3">
      <AddNote  />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

    <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    placeholder="Add a title"
                    onChange={onChange}
                    minLength={5}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="edescription"
                    className="form-label"
                    placeholder="Add your Note"
                  >
                    Note
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                  ></textarea>
                  <div className="my-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} ref={refClose} type="button" className="btn btn-primary" onClick={add}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container my-3">
          <h5>{notes.length===0 && 'No notes found'}</h5>
        </div>
        {notes.map((note) => {
          return (
            <NoteItem note={note} updateNote={updateNote} key={note._id} />
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Notes;
