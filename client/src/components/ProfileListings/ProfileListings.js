import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import placeholderImg from "../../assets/download.jpg";
import SingleModal from "../SingleModal/SingleModal";
import ProfileListingItem from "../ProfileListingItem/ProfileListingItem";
import "./ProfileListings.scss";

const ProfileListings = () => {
  const { dbUser, statusUrl } = useAuth0();
  const [savedListings, setSavedListings] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchActiveListings();
    fetchSavedListings();
  }, [dbUser, statusUrl]);

  const fetchActiveListings = () => {
    axios
      .get(`${statusUrl}api/personallistings/${dbUser.user_uid}`)
      .then((response) => setActiveListings([...response.data].reverse()))
      .catch((err) => console.log(err));
  };

  const fetchSavedListings = () => {
    axios
      .get(`${statusUrl}api/save/get/${dbUser.user_uid}`)
      .then((response) => setSavedListings([...response.data]))
      .catch((err) => console.log(err));
  };

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    document.getElementById("toggleDiv").style.display = "none";
    overlay.classList.remove("active");
  };

  return (
    <div className="profileListingsMother">
      <div className="listingsParent">

    {/* Active Listings  */}
        <div className="activeListingsParent">
          <h2>Your Listings</h2>
          {activeListings.map((listing) => (
              <div key={listing.id} onClick={() => setCurrentItem(listing)}>
              <ProfileListingItem key={listing.id} onClick={() => setCurrentItem(listing)}  listing={listing}/>
              </div>
          ))}
        </div>

    {/* Saved Listings */}
        <div className="savedListingsParent">
          <h2>Saved Listings</h2>
          {savedListings.map((listing) => (
              <div key={listing.id} onClick={() => setCurrentItem(listing)}>
              <ProfileListingItem   listing={listing}/>
              </div>
          ))}
        </div>
      </div>

      <div id="toggleDiv" className="toggleDiv">
        <SingleModal item={currentItem} />
      </div>
      <div onClick={() => overlayClose()} className="" id="overlay"></div>
    </div>
  );
};

export default ProfileListings;
