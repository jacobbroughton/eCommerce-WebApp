import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import "./ProfileEditModal.scss";
let API = require("../../api-calls");

const ProfileEditModal = ({ toggled, handleToggled }) => {
  const { dbUser } = useAuth0();
  const { serverUrl } = useStatusUrl();
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [townCityValue, setTownCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const stateList = [
    "AK",
    "AL",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  useEffect(() => {
      console.log(dbUser)
  }, [])

  const overlayClose = (e) => {
    console.log("Yeet");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
  };

  useEffect(() => {
    console.log("Toggled");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  }, [toggled]);

  const handleFormSubmit = async (e) => {
    let obj = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      townCity: townCityValue,
      state: stateValue,
      verified: true
    };

    await API.handleFormSubmit(serverUrl, dbUser, obj);

    window.location.reload();
  };

  return (
    <>
      {!dbUser.verified && toggled && (
        <div className="profEditMother">
          <div className="formParent">
            <form className="editForm" onSubmit={(e) => handleFormSubmit(e)}>
              <input
                className="formItem"
                value={firstNameValue}
                onChange={(e) => setFirstNameValue(e.target.value)}
                required
                placeholder={"e.g. John"}
              />
              <input
              className="formItem"
                value={lastNameValue}
                onChange={(e) => setLastNameValue(e.target.value)}
                required
                placeholder="e.g. Smith"
              />
              <input
              className="formItem"
                value={townCityValue}
                onChange={(e) => setTownCityValue(e.target.value)}
                required
                placeholder="e.g. Charlotte"
              />
              <select
              className="formItem select"
                onChange={(e) => setStateValue(e.target.value)}
                id="states"
              >
                {stateList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            {/* <textarea placeholder="Bio"></textarea>
              <input type="submit" className="formItem submit" placeholder="Submit" /> */}
            </form>
          </div>
        </div>
      )}
      <div onClick={() => overlayClose()} className="" id="overlay"></div>
      {!dbUser.verified && (
        <button onClick={() => handleToggled()} className="verifyProfButton">Verify your profile</button>
      )}
      
      
    </>
  );
};

export default ProfileEditModal;
