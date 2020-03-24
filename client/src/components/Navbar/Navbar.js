import React from "react";
import { useAuth0 } from "../../contexts/auth0-context";

const Navbar = () => {

    const { isLoading, loginWithRedirect, logout, user } = useAuth0();

    return (
        <nav>
            <button onClick={loginWithRedirect}>Log In</button>
            {user && (
                <button onClick={logout}>Logout</button>
            )}
        </nav>
    )
};

export default Navbar;