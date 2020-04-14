import React, {useEffect, useState} from "react";
import axios from "axios";
import placeholderImg from "../../assets/download.jpg";
import {useAuth0} from "../../contexts/auth0-context";
import "./ProfileSaved.scss";

const ProfileSaved = () => {

    const [listings, setListings] = useState([]);
    const {statusUrl, dbUser} = useAuth0();
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        axios
        .get(`${statusUrl}api/save/get/${dbUser.user_uid}`)
        .then(response => setListings([...response.data].reverse()))
        .catch(err => console.log(err))
    }, [listings])

    const handleModalView = (props) => {
        setCurrentItem(props);
        document.getElementById("toggleDiv").style.display = "block";
        const overlay = document.getElementById("overlay");
        overlay.classList.add("active")
      }
      
      const overlayClose = e => {
        const overlay = document.getElementById("overlay");
        document.getElementById("toggleDiv").style.display = "none";
        overlay.classList.remove("active")
        // closeModal(e, modal, null);
      };

    return (
        <div className="savedMother">
            <h2>Saved Listings</h2>
            {listings.map(listing => (
        <div onClick={() => handleModalView(listing)} key={listing.id} className="listingItem">
                { listing.image !== "null" && listing.image !== null ? 
                  <img
                    className="itemImage"
                    src={statusUrl + listing.image.split(" ")[0]}
                    alt=""
                  />
                :
                <img
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
    )
}

export default ProfileSaved;