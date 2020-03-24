import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export class Auth0Provider extends Component {
    state = {
        auth0Client: null,
        isLoading: null,
        isAuthenticated: null,
        user: null
    };

    config = {
        domain: "jlb1999.auth0.com",
        client_id: "8itFEMVmV4jzAex551vFTg3ik6OHKHwp",
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    };

    // Initialize the auth0 library
    initializeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config);

        this.setState({ auth0Client });

        // Check if they have been redirected after login
        if(window.location.search.includes("code=")) {
            return this.handleRedirectCallback();
        };

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;

        this.setState({ isAuthenticated, user });
    };

    // Handles the authentication callback
    handleRedirectCallback = async () => {
        this.setState({ isLoading: true });

        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();
        this.setState({ user, isAuthenticated: true, isLoading: false });

        window.history.replaceState({}, document.title, window.location.pathname);
    };

    render() {
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;

        const configObject = {
            isLoading, isAuthenticated, user,
            loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
            getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
            getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
            logout: (...p) => auth0Client.logout(...p)
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        )
    }
}