import React, {useState} from "react";
import axios from "axios";
import "./ProfileEditModal.scss";
import {useAuth0} from "../../contexts/auth0-context";

const ProfileEditModal = () => {

    const { dbUser, statusUrl } = useAuth0();
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [townCityValue, setTownCityValue] = useState("");
    const [stateValue, setStateValue] = useState("");
    const [countryValue, setCountryValue] = useState("");

  const handleModalClose = () => {
    let modal = document.getElementById("editModalMother").parentNode;
    modal.style.display = "none";
  };


const handleFormSubmit = (e) => {

    axios
        .post(`${statusUrl}api/updateprofile/${dbUser.user_uid}`, {
            firstName: firstNameValue,
            lastName: lastNameValue,
            townCity: townCityValue,
            state: stateValue,
            country: countryValue
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))

    e.preventDefault()
}



  return (
    <div id="editModalMother">
      <h1>Profile Edit Modal</h1>
      <button className="closeButton" onClick={() => { handleModalClose(); }} > X </button>
      <form className="editForm" onSubmit={(e) => handleFormSubmit(e)}>
        <label>
          First Name
          <input value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)} required placeholder={"e.g. John"} />
        </label>
        <label>
          Last Name
          <input value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)} required placeholder="e.g. Smith" />
        </label>
        <label>
          Town / City (Optional)
          <input value={townCityValue} onChange={(e) => setTownCityValue(e.target.value)} required placeholder="e.g. Charlotte" />
        </label>
        <label>
          State
          <input value={stateValue} onChange={(e) => setStateValue(e.target.value)} required placeholder="e.g. North Carolina" />
        </label>
        <label>
          Country
          <input value={countryValue} onChange={(e) => setCountryValue(e.target.value)} required placeholder="e.g. United States" />
        </label>
        <input  type="submit" placeholder="Submit" />
      </form>
    </div>
  );
};

export default ProfileEditModal;
