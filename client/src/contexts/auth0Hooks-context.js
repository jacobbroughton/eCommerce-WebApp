import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from "axios";
import moment from "moment";
export const Auth0Context = createContext();
export const useAuth0, { useEffect, useState } = () => useContext(Auth0Context);

const Auth0Provider = props => {
  let [state, setState] = useState({
    auth0Client: null,
    isLoading: true,
    isAuthenticated: null,
    user: null,
    dbUser: null,
    statusUrl: ""
  });



  config = {
    domain: "jlb1999.auth0.com",
    client_id: "8itFEMVmV4jzAex551vFTg3ik6OHKHwp",
    redirect_uri: window.location.origin
  };

  const handleStatusUrl = () => {
    if(process.env.NODE_ENV === "development") {
      setState({ statusUrl : "http://localhost:5000" })
    } else if (process.env.NODE_ENV === "production") {
      setState({ statusUrl: "https://ecommerce-webapp-jb.herokuapp.com" })
    }
  }  



  

  const findUserAgain = () => {
    // setState({ isLoading: true });
    const user = state.user;
    if (user) {
      console.log("there is a user, finding in database now")
      axios
        .get(`${state.statusUrl}/api/finduser/${user.email}`)
        .then(response =>
          setState({ dbUser: response.data }, () => console.log(state))
        )
        .catch(err => console.log(err.toJSON()));
      setState({ isLoading: false });
    } else {
      console.log("No user, cant do it.");
      setState({ isLoading: false });
    }
  };

  const addUser = (newUser, randomNum, date, time) => {
    console.log("Adding user!");
    if (newUser.given_name) {
      axios
        .post(`${state.statusUrl}/api/adduser`, {
          user_uid: randomNum,
          email: newUser.email,
          nickname: newUser.nickname,
          first_name: newUser.given_name,
          last_name: newUser.family_name,
          town: null,
          state: null,
          date_created: date,
          time_created: time,
          saved_posts: ""
        }, { timeout: 200 })
        .then(response => console.log(response))
        .catch(err => console.log(err));
        console.log("Added user!")

        findUserAgain();

    } else if (newUser.email) {
      axios
        .post(`${state.statusUrl}/api/adduser`, {
          user_uid: randomNum,
          email: newUser.email,
          nickname: newUser.nickname,
          first_name: null,
          last_name: null,
          town: null,
          state: null,
          date_created: date,
          time_created: time,
          saved_posts: ""
        }, { timeout: 200 })
        .then(response => console.log(response))
        .catch(err => console.log(err));
        console.log("Added user!")

        findUserAgain();
    }
  };

  
  // Add user to database || Find user
  const findUser = newUser => {
    setState({ isLoading: true });
    axios
      .get(`${state.statusUrl}/api/finduser/${newUser.email}`)
      .then(response => {
        console.log("Finduser response is below")
        console.log(response);
        if (response.data === "") {
          console.log("response.data is empty!");
          let uid = createRandomInt(1000000000, 10000000000);
          let time = moment().format("LT");
          let date = moment().format("L");
          let time_created = time.replace(/\s/g, "");
          let date_created = date.replace(/\//g, "-");
          addUser(newUser, uid, time_created, date_created);
          findUserAgain();
          // setState({ isLoading: false });
        } else {
          console.log("User exists!");
          setState({ dbUser: response.data, isLoading: false });
        }
      })
      .catch(err => console.log(err.toJSON()));
  };


// Handles the authentication callback
  const handleRedirectCallback = async () => {
    setState({ isLoading: true });

    await state.auth0Client.handleRedirectCallback();
    const user = await state.auth0Client.getUser();
    setState({ user, isAuthenticated: true }); // There was an isLoading : false here

    console.log("findUser from handleRedirectCallback")
    findUser(user);

    window.history.replaceState({}, document.title, window.location.pathname);
  };



  // Initialize the auth0 library
  const initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(config);

    setState({ auth0Client });

    // Check if they have been redirected after login
    if (window.location.search.includes("code=")) {
      return handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;

    setState({ isAuthenticated, user });

    findUserAgain();
  };



  useEffect(() => {
   handleStatusUrl();
    initializeAuth0();
  }, [])



  // Separate
  const createRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }











  
    const {
      auth0Client,
      isLoading,
      isAuthenticated,
      user,
      dbUser,
    } = state;

    const { children } = props;

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

export default Auth0Provider;