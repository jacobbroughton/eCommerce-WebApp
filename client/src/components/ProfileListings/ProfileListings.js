import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import "./ProfileListings.scss";

const ProfileListings = () => {
  const { dbUser, statusUrl } = useAuth0();
  const [listings, setListings] = useState([]);

  useEffect(() => {
       axios
      .get(`${statusUrl}api/personallistings/${dbUser.user_uid}`)
      .then(response => setListings([...response.data]))
      .catch(err => console.log(err));
  }, [dbUser]);

  return (
    <div className="profileListingsMother">
      {listings.map(listing => (
        console.log(listing),
        <div key={listing.id} className="listingItem">
                    { listing.image !== null && (
            <img src={statusUrl + listing.image} alt={""}/>
          )}
          <div className="listingsTextContainer">
            <h3 className="listingsTitle">{listing.title}</h3>
            <p >{listing.category}</p>

          </div>
          <p className="listingsPrice">{"$" + listing.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileListings;
