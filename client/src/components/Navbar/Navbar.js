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
      <Link to="/" className="homeLink">Home</Link>
        { !user && (
          <div className="loggedOut">
            <button onClick={loginWithRedirect} className="logInBtn">Log In</button>
          </div>
            
        )}
     
      {user && (
        <div className="loggedIn">
          <button onClick={logout} className="logOutBtn">Logout</button>
      {/* { dbUser && (
        <h1>{dbUser.nickname}</h1>
      )} */}
          <Link to="/profile" className="profileLink">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;