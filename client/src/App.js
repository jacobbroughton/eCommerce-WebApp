import React from "react";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/Router";
import Loading from "./components/Loading/Loading";
import { useAuth0 } from "./contexts/auth0-context";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if(isLoading) {
    return <Loading/>;
  }
  
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
