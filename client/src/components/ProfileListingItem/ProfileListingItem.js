import React from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import placeholderImg from "../../assets/download.jpg";
import "../ProfileListingItem/ProfileListingItem";

const ProfileListingItem = (props) => {

    const { statusUrl, dbUser } = useAuth0();
    const {status, listing} = props;

    const handleUnsave = (listing) => {
        axios
        .get(`${statusUrl}api/save/update/${listing.listing_uid}/${dbUser.user_uid}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
    }

    const handleModalView = (e, listing) => {
       if(e.target.tagName === "BUTTON") {
        handleUnsave(listing);
       } else {
        document.getElementById("toggleDiv").style.display = "block";
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active");
       }     
    };

    return (
        <div
        onClick={(e) => handleModalView(e, listing)}
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
        {status === "saved" && (
            <button className="unsaveBtn" >Unsave</button>
        )}
      </div>
    )
}

export default ProfileListingItem;

