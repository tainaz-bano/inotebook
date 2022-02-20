import React, { useState } from "react";
 import NoteContext from "./notecontext";

 const NoteState= (props)=>
 {
  const host= "http://localhost:5000"
    const notesInitial=[ {
      "user": "621287959de40ffdaff1fa69",
      "title": "My NBote",
      "description": "please subscribe efsfsdf",
      "tag": "youtube",
      "_id": "6212b1c2dc99d12dd2e1389c",
      "date": "2022-02-20T21:25:22.064Z",
      "__v": 0
    }]
    
      const [notes, setnotes] = useState(notesInitial)

    // Get all Note

    const getNotes=async ()=>
      {
        // API Call- Add Note
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
            
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMjg3OTU5ZGU0MGZmZGFmZjFmYTY5In0sImlhdCI6MTY0NTM4MTUyNX0.DaAsfozBiO5xkfGfLB3BU-uWnE-n38-n4EJjwA4_Lok'
         
          },
        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        setnotes(json)
          
      }
      // Add a note
      const addNote=async (title, description, tag)=>
      {
        // API Call- Add Note
        
        const response = await fetch(`${host}/api/notes/addnote/`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
            
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMjg3OTU5ZGU0MGZmZGFmZjFmYTY5In0sImlhdCI6MTY0NTM4MTUyNX0.DaAsfozBiO5xkfGfLB3BU-uWnE-n38-n4EJjwA4_Lok'
         
          },
         
          body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        // const json= response.json(); // parses JSON response into native JavaScript objects
        
          // To be deleted
        const note=[ {
          "user": "621287959de40ffdaff1fa69",
          "title": title,
          "description": description,
          "tag": tag,
          "_id": "6212a4bbdf4b8bacf72f72fe",
          "date": "2022-02-20T20:29:47.212Z",
          "__v": 0
        }]
        setnotes(notes.concat(note))
      }

      // Delete a note

      const deleteNote=(id)=>{
        console.log(id);
        const newNotes= notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
        
      }

      //  Edit a note

      const editNote= async (id, title, description,tag)=>
      {
        // API Call - Server side updation
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
            
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMjg3OTU5ZGU0MGZmZGFmZjFmYTY5In0sImlhdCI6MTY0NTM4MTUyNX0.DaAsfozBiO5xkfGfLB3BU-uWnE-n38-n4EJjwA4_Lok'
         
          },
         
          body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        // const json= response.json(); // parses JSON response into native JavaScript objects
        

        // Client side updation   
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id=== id){
            element.title= title;
            element.description= description
            element.tag= tag
          }
        }
        }        
      
  return(
    <NoteContext.Provider value={{notes,getNotes, addNote,deleteNote,editNote}}>
        {props.children}
    </NoteContext.Provider>
    
  )
}


 export default NoteState