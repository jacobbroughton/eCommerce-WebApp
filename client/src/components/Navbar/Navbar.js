import React, {useEffect} from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const { isLoading, loginWithRedirect, logout, user, dbUser } = useAuth0();


  
  useEffect(() => {
    console.log("isLoading: " + isLoading)
  }, [isLoading])



  return (
    <nav>
      {/* <Link to="/" className="homeLink">Home</Link> */}
        { !user && (
          <div className="loggedOut">
            <button onClick={loginWithRedirect} className="logInBtn">Log In</button>
          </div>
            
        )}
     
      {user && (
        <div className="loggedIn">
          <button onClick={logout} className="logOutBtn">Logout</button>
          <Link to="/browse/category/All-For-Sale" className="browseLink">Browse</Link>
          { dbUser && dbUser.first_name && (
            <Link to="/sell" className="sellLink">Sell</Link>
          )}
          <Link to="/profile" className="profileLink">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;