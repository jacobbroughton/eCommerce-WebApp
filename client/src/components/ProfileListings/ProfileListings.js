import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import placeholderImg from "../../assets/download.jpg";
import "./ProfileListings.scss";

const ProfileListings = () => {
  const { dbUser, statusUrl } = useAuth0();
  const [listings, setListings] = useState([]);

  useEffect(() => {
       axios
      .get(`${statusUrl}api/personallistings/${dbUser.user_uid}`)
      .then(response => setListings([...response.data].reverse()))
      .catch(err => console.log(err));
  }, [dbUser]);

  return (
    <div className="profileListingsMother">
      <h2>Your Listings</h2>
      {listings.map(listing => (
        <div key={listing.id} className="listingItem">
                { listing.image !== "null" && listing.image !== null ? 
                  <img
                    // onLoad={() => setLoadCounter(loadCounter++)}
                    className="itemImage"
                    src={statusUrl + listing.image.split(" ")[0]}
                    alt=""
                  />
                :
                <img
                // onLoad={() => setLoadCounter(loadCounter++)}
                className="itemImage"
                src={placeholderImg}
                alt=""
              />
                }
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
