import React, {useState} from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import "./ProfileTopSect.scss";
let API = require("../../api-calls");

const ProfileTopSect = () => {
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
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
]

const handleFormSubmit = async (e) => {
  let obj = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    townCity: townCityValue,
    state: stateValue
  }

  await API.handleFormSubmit(serverUrl, dbUser, obj)

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
          <h1>{dbUser.first_name + " " + dbUser.last_name}</h1>
        </div>
      )}
    </div>
  );
};

export default ProfileTopSect;
