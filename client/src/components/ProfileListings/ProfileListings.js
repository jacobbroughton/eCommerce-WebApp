import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import "./ProfileListings.scss";

const ProfileListings = () => {
  const { dbUser } = useAuth0();
  const [listings, setListings] = useState([]);

  const getListings = () => {
    axios
      .get(`http://localhost:5000/api/personallistings/${dbUser.user_uid}`)
      .then(response => setListings([...response.data]))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getListings();
  }, [listings]);

  return (
    <div className="profileListingsMother">
      {listings.map(listing => (
        <div key={listing.id} className="listingItem">
          <h3>{listing.title}</h3>
          <p>{listing.category}</p>
          <p>{listing.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileListings;
