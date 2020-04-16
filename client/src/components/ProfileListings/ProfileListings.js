import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import placeholderImg from "../../assets/download.jpg";
import SingleModal from "../SingleModal/SingleModal";
import "./ProfileListings.scss";

const ProfileListings = () => {
  const { dbUser, statusUrl } = useAuth0();
  const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${statusUrl}api/personallistings/${dbUser.user_uid}`)
      .then((response) => setListings([...response.data].reverse()))
      .catch((err) => console.log(err));
  }, [dbUser, statusUrl]);

  const handleModalView = (props) => {
    setCurrentItem(props);
    document.getElementById("toggleDiv").style.display = "block";
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  };

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    document.getElementById("toggleDiv").style.display = "none";
    document.getElementById("toggleDiv2").style.display = "none";
    overlay.classList.remove("active");
    // closeModal(e, modal, null);
  };

  return (
    <div className="profileListingsMother">
      <h2>Your Listings</h2>
      {listings.map((listing) => (
        <div
          onClick={() => handleModalView(listing)}
          key={listing.id}
          className="listingItem"
        >
          {listing.image !== "null" && listing.image !== null ? (
            <img
              className="itemImage"
              src={statusUrl + listing.image.split(" ")[0]}
              alt=""
            />
          ) : (
            <img className="itemImage" src={placeholderImg} alt="" />
          )}
          <div className="listingsTextContainer">
            <h3 className="listingsTitle">{listing.title}</h3>
            <p>{listing.category}</p>
          </div>
          <p className="listingsPrice">{"$" + listing.price}</p>
        </div>
      ))}
      <div id="toggleDiv" className="toggleDiv">
        <SingleModal item={currentItem} />
      </div>
      <div onClick={() => overlayClose()} className="" id="overlay"></div>
    </div>
  );
};

export default ProfileListings;
