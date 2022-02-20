import React from "react";
 import NoteContext from "./notecontext";

 const NoteState= (props)=>{
     const state={
         "name":"T"
     }
    return(
    <NoteContext.Provider value={state}>
        {props.children}
    </NoteContext.Provider>
    )
 }

 export default NoteState