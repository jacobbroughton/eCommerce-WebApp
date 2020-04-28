import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import {Link} from "react-router-dom"; 
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



  const fetchSavedListings = () => {
    axios
      .get(`${statusUrl}api/save/get/${dbUser.user_uid}`)
      .then((response) => setSavedListings([...response.data]))
      .catch((err) => console.log(err));
  };



  const fetchActiveListings = () => {
    axios
      .get(`${statusUrl}api/personallistings/${dbUser.user_uid}`)
      .then((response) => setActiveListings([...response.data].reverse()))
      .catch((err) => console.log(err));
  };



  const handleSavedClick = (e, listing) => {
    setCurrentItem(listing)
  }



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
            // <Link key={listing.id} to={`/browse/single/${listing.listing_uid}`}>
              <div  onClick={() => setCurrentItem(listing)}>
                <ProfileListingItem status={"active"} listing={listing}/>
              </div>
            // </Link>

          ))}
        </div>

    {/* Saved Listings */}
        <div className="savedListingsParent">
          <h2>Saved Listings</h2>
          {savedListings.map((listing) => (
            // <Link key={listing.id} to={`/browse/single/${listing.listing_uid}`}>
              <div onClick={(e) => handleSavedClick(e, listing)}>
                <ProfileListingItem status={"saved"} listing={listing}/>
              </div>
            // </Link>
   
          ))}
        </div>
      </div>

      {/* <div id="toggleDiv" className="toggleDiv">
        <SingleModal item={currentItem} />
      </div> */}
      <div onClick={() => overlayClose()} className="" id="overlay"></div>
    </div>
  );
};

export default ProfileListings;
