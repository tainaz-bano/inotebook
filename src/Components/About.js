import React,{useContext} from 'react'
import noteContext from '../Context/notes/notecontext'
export const About = () => {
  const a = useContext(noteContext)
  return (
    
    <div>About {a.name}</div>
  )
}
