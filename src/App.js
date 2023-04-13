import "./App.css";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState.js";
import Alert from "./components/Alert.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import { useState } from "react";


function App() {
  const [alert, setAlert] = useState("");
  const [bool, setBool] = useState(false);
  const showAlert = (message) => {
    setBool(true);
    setAlert(message);

    setTimeout(() => {
      setAlert("");
      setBool(false);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {bool && <Alert message={alert} />}

          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}></Home>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
