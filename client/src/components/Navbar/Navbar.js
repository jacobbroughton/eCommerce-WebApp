import React, {useEffect} from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const { isLoading, loginWithRedirect, logout, user, dbUser } = useAuth0();

  useEffect(() => {
    console.log("Lets try that again!")
  }, [dbUser])


  return (
    <nav>
        { !user && (
            <button onClick={loginWithRedirect}>Log In</button>
        )}
     
      {user && (
        <div>
          <button onClick={logout}>Logout</button>
      { dbUser && (
        <h1>{dbUser.nickname}</h1>
      )}
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;