import React, {useState, useEffect} from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import "./ProfileTopSect.scss";

const ProfileTopSect = () => {
  const { dbUser, user } = useAuth0();
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [townCityValue, setTownCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const stateList = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
   'Wyoming'
]


const handleFormSubmit = (e) => {

  axios
      .post(`http://localhost:5000/api/updateprofile/${dbUser.user_uid}`, {
          firstName: firstNameValue,
          lastName: lastNameValue,
          townCity: townCityValue,
          state: stateValue,
          country: countryValue
      })
      .then(response => console.log(response))
      .catch(err => console.log(err))
}

  return (
    <div className="profileTopSectMother">
    {/* Not verified section */}
      {dbUser.first_name === null && (
        <div className="notVerifiedDiv">
          <h2 className="profileEmailHead">{dbUser.email}</h2>
          <div className="profileFormDiv">
            <form className="editForm" onSubmit={e => handleFormSubmit(e)}>
                <input
                  value={firstNameValue}
                  onChange={e => setFirstNameValue(e.target.value)}
                  required
                  placeholder={"e.g. John"}
                />
                <input
                  value={lastNameValue}
                  onChange={e => setLastNameValue(e.target.value)}
                  required
                  placeholder="e.g. Smith"
                />
                <input
                  value={townCityValue}
                  onChange={e => setTownCityValue(e.target.value)}
                  required
                  placeholder="e.g. Charlotte"
                />
                <select onChange={e => setStateValue(e.target.value)} id="states">
                 {
                     stateList.map(state => 
                     <option key={state} value={state}>{state}</option>
                     )
                    }
                </select>
              <input type="submit" className="submit" placeholder="Submit" />
            </form>
          </div>
        </div>
      )}

      {/* Verified section */}
      {dbUser.first_name && (
        <div className="verifiedDiv">
            <h1>{dbUser.email}</h1>
          <h2>{dbUser.first_name + " " + dbUser.last_name}</h2>
        </div>
      )}
    </div>
  );
};

export default ProfileTopSect;
