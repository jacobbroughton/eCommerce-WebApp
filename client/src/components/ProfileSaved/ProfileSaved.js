import React, { useEffect, useState } from "react";
import axios from "axios";
import placeholderImg from "../../assets/download.jpg";
import { useAuth0 } from "../../contexts/auth0-context";
import SingleModal from "../SingleModal/SingleModal";
import "./ProfileSaved.scss";

const ProfileSaved = () => {
  const { dbUser, statusUrl  } = useAuth0();
  const [listings, setListings] = useState([]); 
  const [currentItem2, setCurrentItem2] = useState(null);

  useEffect(() => {
    axios
      .get(`${statusUrl}api/save/get/${dbUser.user_uid}`)
      .then((response) => setListings([...response.data]))
      .catch((err) => console.log(err));
  }, [dbUser, statusUrl]);


  const handleModalView = (props) => {
    setCurrentItem2(props);
    document.getElementById("toggleDiv2").style.display = "block";
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  };

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    document.getElementById("toggleDiv2").style.display = "none";
    overlay.classList.remove("active");
    // closeModal(e, modal, null);
  };

  return (
    <div className="savedMother">
      <h2>Saved Listings</h2>
      {listings.map(
        (listing) => (
          
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
          
        )
      )}
      <div id="toggleDiv2" className="toggleDiv">
        <SingleModal item={currentItem2} />
      </div>
      <div onClick={() => overlayClose()} className="" id="overlay"></div>
    </div>
  );
};

export default ProfileSaved;
