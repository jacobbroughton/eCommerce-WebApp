import React from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import placeholderImg from "../../assets/download.jpg";
import "../ProfileListingItem/ProfileListingItem";

const ProfileListingItem = (props) => {

    const { statusUrl } = useAuth0();
    const {listing} = props;

    const handleModalView = (props) => {
        document.getElementById("toggleDiv").style.display = "block";
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active");
    };

    return (
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
}

export default ProfileListingItem;

