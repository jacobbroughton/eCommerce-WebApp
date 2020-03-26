import React from "react";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AppRouter/>
      </div>
    </Router>
  );
}

export default App;
