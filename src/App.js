import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { About } from "./Components/About";
import { Home } from "./Components/Home";
import NoteState from "./Context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert"

function App() {
 const [alert, setalert] = useState(null)
  const showAlert= (msg , type) => {
    setalert({
      msg : msg,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            </div>
          
          <div className="container">
            <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
