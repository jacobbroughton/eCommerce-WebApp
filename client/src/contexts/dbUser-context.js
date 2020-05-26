import React, { createContext, useContext, useState, useEffect } from "react";

export const DbUserContext = createContext();
export const useDbUser = useContext(DbUserContext);
export const DbUserProvider = props => {

    let [dbUser, setDbUser] = useState()

    // Separate
  const createRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const addUser = (newUser, randomNum, date, time) => {
    console.log("Adding user!");
    if (newUser.given_name) {
      axios
        .post(`${this.state.statusUrl}/api/adduser`, {
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
        .post(`${this.state.statusUrl}/api/adduser`, {
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
    this.setState({ isLoading: true });
    axios
      .get(`${this.state.statusUrl}/api/finduser/${newUser.email}`)
      .then(response => {
        console.log("Finduser response is below")
        console.log(response);
        if (response.data === "") {
          console.log("response.data is empty!");
          let uid = this.createRandomInt(1000000000, 10000000000);
          let time = moment().format("LT");
          let date = moment().format("L");
          let time_created = time.replace(/\s/g, "");
          let date_created = date.replace(/\//g, "-");
          addUser(newUser, uid, time_created, date_created);
          findUserAgain();
          // this.setState({ isLoading: false });
        } else {
          console.log("User exists!");
          this.setState({ dbUser: response.data, isLoading: false });
        }
      })
      .catch(err => console.log(err.toJSON()));
  };

  const findUserAgain = () => {
    // this.setState({ isLoading: true });
    const user = this.state.user;
    if (user) {
      console.log("there is a user, finding in database now")
      axios
        .get(`${this.state.statusUrl}/api/finduser/${user.email}`)
        .then(response =>
          this.setState({ dbUser: response.data }, () => console.log(this.state))
        )
        .catch(err => console.log(err.toJSON()));
      this.setState({ isLoading: false });
    } else {
      console.log("No user, cant do it.");
      this.setState({ isLoading: false });
    }
  };

    return (
        <DbUserContext.Provider>
            {props.children}
        </DbUserContext.Provider>
    )
}