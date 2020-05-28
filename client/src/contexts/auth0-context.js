import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import moment from "moment";
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);
let API = require("../api-calls");

export class Auth0Provider extends Component {
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: null,
    user: null,
    dbUser: null,
    statusUrl: ""
  };

  config = {
    domain: "jlb1999.auth0.com",
    client_id: "8itFEMVmV4jzAex551vFTg3ik6OHKHwp",
    redirect_uri: window.location.origin
  };

  componentDidMount() {
    this.handleStatusUrl();
    this.initializeAuth0();
  }

  handleStatusUrl = () => {
    if(process.env.NODE_ENV === "development") {
      this.setState({ statusUrl : "http://localhost:5000" })
    } else if (process.env.NODE_ENV === "production") {
      this.setState({ statusUrl: "https://ecommerce-webapp-jb.herokuapp.com" })
    }
  }

  // Separate
  createRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  addUser = async (newUser, randomNum, date, time) => {
    console.log("Adding user!");
    let objWithName = {
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
        }

    if (newUser.given_name) {
        await API.addUser(this.state.statusUrl, objWithName);
        this.findUserAgain();
    } else if (newUser.email) {
      let objWithEmail = {
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
        }

      await API.addUser(this.state.statusUrl, objWithEmail)
      this.findUserAgain();
    }
  };



  // Add user to database || Find user
  
  findUser = async newUser => {
    this.setState({ isLoading: true });

      const res = await API.findUser(this.state.statusUrl, newUser);
      if (res.data === "") {
        console.log("res.data is empty!");
        let uid = this.createRandomInt(1000000000, 10000000000);
        let time = moment().format("LT");
        let date = moment().format("L");
        let time_created = time.replace(/\s/g, "");
        let date_created = date.replace(/\//g, "-");
        this.addUser(newUser, uid, time_created, date_created);
        this.findUserAgain();
      } else {
        console.log("User exists!");
        this.setState({ dbUser: res.data, isLoading: false });
      }

  };


  findUserAgain = async () => {
    const user = this.state.user;
    if (user) {
      console.log("there is a user, finding in database now")
      const res = await API.findUser(this.state.statusUrl, user);
      this.setState({ dbUser: res.data, isLoading: false });
    } else {
      console.log("No user, cant do it.");
      this.setState({ isLoading: false });
    }
  };




  // Initialize the auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    console.log(this.state.auth0Client)
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
    console.log(this.state.auth0Client)
    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();
    this.setState({ user, isAuthenticated: true }); // There was an isLoading : false here

    console.log("findUser from handleRedirectCallback")
    this.findUser(user);

    window.history.replaceState({}, document.title, window.location.pathname);
  };

  render() {
    const {
      auth0Client,
      isLoading,
      isAuthenticated,
      user,
      dbUser,
    } = this.state;

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







// import React, { createContext, useContext, useState, useEffect, useReducer} from "react";
// import createAuth0Client from "@auth0/auth0-spa-js";
// import { useStatusUrl } from "./statusUrl-context";
// import axios from "axios";
// import moment from "moment";
// export const Auth0Context = createContext();
// export const useAuth0 = () => useContext(Auth0Context);

//   let initialState = {
//     isLoading: true,
//     user: null,
//     isAuthenticated: false, 
//     auth0Client: null
//   };


//   const auth0Reducer = (state, action) => {
//     switch (action.type) {
//       case "loading": {
//         return {
//           ...state,
//           isLoading: true,
//         };
//       }
//       case "not loading": {
//         return {
//           ...state,
//           isLoading: false,
//         };
//       }
//       case "redirect callback": {
//         console.log(action.payload)
//         return {
//           ...state,
//           isAuthenticated: true,
//           user: action.payload.userLocal
//         }
//       }
//       case "auth0 client": {
//         console.log(action.payload)
//         return {
//           ...state,
//           auth0Client: action.payload
//         }
//       }
//       default:
//         break;
//     }
//     return state;
//   };



// export const Auth0Provider = (props) => {

//   const { serverUrl } = useStatusUrl();
//   const [dbUser, setDbUser] = useState(null);

//   const [state, dispatch] = useReducer(auth0Reducer, initialState);

//   let config = {
//     domain: "jlb1999.auth0.com",
//     client_id: "8itFEMVmV4jzAex551vFTg3ik6OHKHwp",
//     redirect_uri: window.location.origin,
//   };


//   const findUserAgain = () => {
//     dispatch({ type: "loading" });
//     if (state.user) {
//       console.log("there is a user, finding in database now");
//       axios
//         .get(`${serverUrl}/api/finduser/${state.user.email}`)
//         .then((response) => setDbUser(response.data))
//         .catch((err) => console.log(err.toJSON()));
//       dispatch({ type: "not loading" });
//     } else {
//       console.log("No user, cant do it.");
//       dispatch({ type: "not loading" });
//     }
//   };

//   const addUser = (newUser, randomNum, date, time) => {
//     console.log("Adding user!");
//     if (newUser.given_name) {
//       axios
//         .post(
//           `${serverUrl}/api/adduser`,
//           {
//             user_uid: randomNum,
//             email: newUser.email,
//             nickname: newUser.nickname,
//             first_name: newUser.given_name,
//             last_name: newUser.family_name,
//             town: null,
//             state: null,
//             date_created: date,
//             time_created: time,
//             saved_posts: "",
//           },
//           { timeout: 200 }
//         )
//         .then((response) => console.log(response))
//         .catch((err) => console.log(err));
//       console.log("Added user!");

//       findUserAgain();
//     } else if (newUser.email) {
//       axios
//         .post(
//           `${serverUrl}/api/adduser`,
//           {
//             user_uid: randomNum,
//             email: newUser.email,
//             nickname: newUser.nickname,
//             first_name: null,
//             last_name: null,
//             town: null,
//             state: null,
//             date_created: date,
//             time_created: time,
//             saved_posts: "",
//           },
//           { timeout: 200 }
//         )
//         .then((response) => console.log(response))
//         .catch((err) => console.log(err));
//       console.log("Added user!");

//       findUserAgain();
//     }
//   };

//   // Add user to database || Find user
//   const findUser = (newUser) => {
//     dispatch({ type: "loading" });
//     axios
//       .get(`${serverUrl}/api/finduser/${newUser.email}`)
//       .then((response) => {
//         console.log("Finduser response is below");
//         console.log(response);
//         if (response.data === "") {
//           console.log("response.data is empty!");
//           let uid = createRandomInt(1000000000, 10000000000);
//           let time = moment().format("LT");
//           let date = moment().format("L");
//           let time_created = time.replace(/\s/g, "");
//           let date_created = date.replace(/\//g, "-");
//           addUser(newUser, uid, time_created, date_created);
//           findUserAgain();
//           dispatch({ type: 'not loading' })
//         } else {
//           console.log("User exists!");
//           setDbUser(response.data);
//           dispatch({ type: "not loading" });
//         }
//       })
//       .catch((err) => {
//         console.log("Error from findUser below");
//         console.log(err.toJSON())
//       }
//       );
//   };

//   // Initialize the auth0 library
//   const initializeAuth0 = async () => {
//     dispatch({ type: "loading" });
//     const auth0ClientLocal = await createAuth0Client(config);

//     if (window.location.search.includes("code=")) {
//       console.log("In here")
//       try{
//         handleRedirectCallback(auth0ClientLocal);
//       } catch (error) { 
//         console.log("Error from initialize below")
//         console.log(error)
//       }
      
//     }
//     dispatch({ type: "auth0 client", payload: auth0ClientLocal })
//     findUserAgain();
//   };

//   // Handles the authentication callback
//   const handleRedirectCallback = async (auth0Cl) => {
//     await auth0Cl.handleRedirectCallback();
//     const userLocal = await auth0Cl.getUser();
//     findUser(userLocal);
//     dispatch({ type: "redirect callback" , payload: {userLocal}})
//     window.history.replaceState({}, document.title, window.location.pathname);
//   };

//   useEffect(() => {
//     initializeAuth0();
//   }, []);


//   // Separate
//   const createRandomInt = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
//   };

//   const { children } = props;
//   let { isLoading, user, isAuthenticated, auth0Client } = state;

//   const configObject = {
//     isLoading,
//     isAuthenticated,
//     user,
//     dbUser,
//     loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
//     getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
//     getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
//     logout: (...p) => auth0Client.logout(...p),
//   };

//   return (
//     <Auth0Context.Provider value={configObject}>
//       {children}
//     </Auth0Context.Provider>
//   );
// };











// import React, { Component, createContext, useContext, useState, useEffect } from "react";
// import createAuth0Client from "@auth0/auth0-spa-js";
// import axios from "axios";
// import moment from "moment";
// export const Auth0Context = createContext();
// export const useAuth0 = () => useContext(Auth0Context);

// export const Auth0Provider = props => {
//   let initialState = {
//     auth0Client: null,
//     isLoading: true,
//     isAuthenticated: null,
//     user: null,
//     dbUser: null,
//     statusUrl: ""
//   }

//   let auth0Reducer = (state, action) => {
//     switch (action.type) {
//       case ""
//     }
//   }

//   let config = {
//     domain: "jlb1999.auth0.com",
//     client_id: "8itFEMVmV4jzAex551vFTg3ik6OHKHwp",
//     redirect_uri: window.location.origin
//   };

//   const handleStatusUrl = () => {
//     if(process.env.NODE_ENV === "development") {
//       setState({ statusUrl : "http://localhost:5000" })
//     } else if (process.env.NODE_ENV === "production") {
//       setState({ statusUrl: "https://ecommerce-webapp-jb.herokuapp.com" })
//     }
//   }

//   const findUserAgain = () => {
//     // setState({ isLoading: true });
//     const user = state.user;
//     if (user) {
//       console.log("there is a user, finding in database now")
//       axios
//         .get(`${state.statusUrl}/api/finduser/${user.email}`)
//         .then(response =>
//           setState({ dbUser: response.data }, () => console.log(state))
//         )
//         .catch(err => console.log(err.toJSON()));
//       setState({ isLoading: false });
//     } else {
//       console.log("No user, cant do it.");
//       setState({ isLoading: false });
//     }
//   };

//   const addUser = (newUser, randomNum, date, time) => {
//     console.log("Adding user!");
//     if (newUser.given_name) {
//       axios
//         .post(`${state.statusUrl}/api/adduser`, {
//           user_uid: randomNum,
//           email: newUser.email,
//           nickname: newUser.nickname,
//           first_name: newUser.given_name,
//           last_name: newUser.family_name,
//           town: null,
//           state: null,
//           date_created: date,
//           time_created: time,
//           saved_posts: ""
//         }, { timeout: 200 })
//         .then(response => console.log(response))
//         .catch(err => console.log(err));
//         console.log("Added user!")

//         findUserAgain();

//     } else if (newUser.email) {
//       axios
//         .post(`${state.statusUrl}/api/adduser`, {
//           user_uid: randomNum,
//           email: newUser.email,
//           nickname: newUser.nickname,
//           first_name: null,
//           last_name: null,
//           town: null,
//           state: null,
//           date_created: date,
//           time_created: time,
//           saved_posts: ""
//         }, { timeout: 200 })
//         .then(response => console.log(response))
//         .catch(err => console.log(err));
//         console.log("Added user!")

//         findUserAgain();
//     }
//   };

//   // Add user to database || Find user
//   const findUser = newUser => {
//     setState({ isLoading: true });
//     axios
//       .get(`${state.statusUrl}/api/finduser/${newUser.email}`)
//       .then(response => {
//         console.log("Finduser response is below")
//         console.log(response);
//         if (response.data === "") {
//           console.log("response.data is empty!");
//           let uid = createRandomInt(1000000000, 10000000000);
//           let time = moment().format("LT");
//           let date = moment().format("L");
//           let time_created = time.replace(/\s/g, "");
//           let date_created = date.replace(/\//g, "-");
//           addUser(newUser, uid, time_created, date_created);
//           findUserAgain();
//           // setState({ isLoading: false });
//         } else {
//           console.log("User exists!");
//           setState({ dbUser: response.data, isLoading: false });
//         }
//       })
//       .catch(err => console.log(err.toJSON()));
//   };

// // Handles the authentication callback
//   const handleRedirectCallback = async () => {
//     setState({ isLoading: true });

//     await state.auth0Client.handleRedirectCallback();
//     const user = await state.auth0Client.getUser();
//     setState({ user, isAuthenticated: true }); // There was an isLoading : false here

//     console.log("findUser from handleRedirectCallback")
//     findUser(user);

//     window.history.replaceState({}, document.title, window.location.pathname);
//   };

//   // Initialize the auth0 library
//   const initializeAuth0 = async () => {
//     const auth0Client = await createAuth0Client(config);

//     setState({ auth0Client });

//     // Check if they have been redirected after login
//     if (window.location.search.includes("code=")) {
//       return handleRedirectCallback();
//     }

//     const isAuthenticated = await auth0Client.isAuthenticated();
//     const user = isAuthenticated ? await auth0Client.getUser() : null;

//     setState({ isAuthenticated, user });

//     findUserAgain();
//   };

//   useEffect(() => {
//    handleStatusUrl();
//     initializeAuth0();
//   }, [])

//   // Separate
//   const createRandomInt = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
//   }

//     const {
//       auth0Client,
//       isLoading,
//       isAuthenticated,
//       user,
//       dbUser,
//     } = state;

//     const { children } = props;

//     console.log(state)

//     const configObject = {
//       isLoading,
//       isAuthenticated,
//       user,
//       dbUser,
//       loginWithRedirect: (...p) => state.auth0Client.loginWithRedirect(...p),
//       getTokenSilently: (...p) => state.auth0Client.getTokenSilently(...p),
//       getIdTokenClaims: (...p) => state.auth0Client.getIdTokenClaims(...p),
//       logout: (...p) => auth0Client.logout(...p)
//     };

//     return (
//       <Auth0Context.Provider value={configObject}>
//         {children}
//       </Auth0Context.Provider>
//     );
// }
