import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './Context/NoteState';
// import Alert from './components/Alert';
// import { useState } from 'react';

function App() {

  //For Show the Different alerts After Proccesses
  // const [alert, setalert] = useState(null);
  // Method to Show Different alerts
  // const showAlert = (message, type) => {
  //   setalert({
  //     msg: "Hello",
  //     type: "primary",
  //   });
  //   setTimeout(() => {
  //     setalert(null);
  //   }, 1500);
  // };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert alert={alert} /> */}

          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
