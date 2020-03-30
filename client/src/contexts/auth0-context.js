import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from "axios";
import moment from "moment";
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export class Auth0Provider extends Component {
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: null,
    user: null, 
    dbUser: null
  };

  config = {
    domain: "jlb1999.auth0.com",
    client_id: "8itFEMVmV4jzAex551vFTg3ik6OHKHwp",
    redirect_uri: window.location.origin
  };

  componentDidMount() {
    this.initializeAuth0();
  }

  createRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  addUser = (newUser, randomNum, date, time) => {
      console.log("Adding user!")
    if(newUser.given_name) { 
        axios
        .post(`http://localhost:5000/api/adduser`, {
            user_uid: randomNum,
            email: newUser.email,
            nickname: newUser.nickname,
            first_name: newUser.given_name,
            last_name: newUser.family_name,
            town: "null",
            state: "null",
            country: "null",
            date_created: date,
            time_created: time
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
     } else { 
        axios
        .post(`http://localhost:5000/api/adduser`, {
            user_uid: randomNum,
            email: newUser.email,
            nickname: newUser.nickname,
            first_name: "null",
            last_name: "null",
            town: "null",
            state: "null",
            country: "null",
            date_created: date,
            time_created: time
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
     }
  };
  


  // Add user to database || Find user
  findUser = newUser => {
      this.setState({ isLoading: true });
    axios
      .get(`http://localhost:5000/api/finduser/${newUser.email}`)
      .then(response => {
        console.log(response);
        if (response.data === "") {
            console.log("response.data is empty!")
            let uid = this.createRandomInt(1000000000, 10000000000);
            let time = moment().format("LT");
            let date = moment().format("L");
            let time_created = time.replace(/\s/g, "");
            let date_created = date.replace(/\//g, "-");
            this.addUser(newUser, uid, time_created, date_created);
            this.findUserAgain();
            this.setState({ isLoading: false });
        } else {
            console.log("User exists!")
            this.setState({ dbUser: response.data, isLoading: false });
        }
      })
      .catch(err => console.log(err.toJSON()));
  };

  findUserAgain = () => {
    const user = this.state.user;
    if(user) {
           axios
        .get(`http://localhost:5000/api/finduser/${user.email}`)
        .then(response => this.setState({ dbUser: response.data, isLoading: false }))
        .catch(err => console.log(err)); 
    } else {
        console.log("No user, cant do it.");
        this.setState({ isLoading: false });
    }

  }
  // Initialize the auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);

    this.setState({ auth0Client });

    // Check if they have been redirected after login
    if (window.location.search.includes("code=")) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;

    this.setState({ isAuthenticated, user });

    this.findUserAgain();
  };

  // Handles the authentication callback
  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });

    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();
    this.setState({ user, isAuthenticated: true, isLoading: false });

    this.findUser(user);

    window.history.replaceState({}, document.title, window.location.pathname);
  };

  render() {
    const { auth0Client, isLoading, isAuthenticated, user, dbUser } = this.state;
    const { children } = this.props;

    const configObject = {
      isLoading,
      isAuthenticated,
      user,
      dbUser,
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      logout: (...p) => auth0Client.logout(...p)
    };

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
