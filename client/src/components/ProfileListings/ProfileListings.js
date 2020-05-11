import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
// import ProductListItem from "../ProductListItem/ProductListItem"
import {Link} from "react-router-dom"; 
import placeholderImg from "../../assets/download.jpg";
import SingleModal from "../SingleModal/SingleModal";
import ProductListItem from "../ProductList-Item/ProductList-Item";
import "./ProfileListings.scss";

const ProfileListings = () => {
  const { dbUser, statusUrl } = useAuth0();
  const [savedListings, setSavedListings] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  let [toggled, setToggled] = useState(false);



  useEffect(() => {
    fetchActiveListings();
    fetchSavedListings();
    fetchSoldListings();
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

  const fetchSoldListings = () => {
    axios
    .get(`${statusUrl}api/personallistings/sold/${dbUser.user_uid}`)
    .then(res => setSoldListings([...res.data].reverse()))
    .catch(err => console.log(err))
  }



  const handleSavedClick = (e, listing) => {
    setCurrentItem(listing)
  }



  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    setToggled(false);
    overlay.classList.remove("active");
  };

  const handleModalView = (props) => {
    setCurrentItem(props);
    setToggled(true);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  };

  const handleToggle = () => {
    toggled ? setToggled(false) : setToggled(true);
  };
  
  return (
    <div className="profileListingsMother">
      <div className="listingsParent">

        <div className="activeListingsParent">
          <div className="browsePListings">
            <div className="activeSection">
              <h3>Your Listings</h3>
              <div className="activeGrid">
                {activeListings.length >= 1 && activeListings.slice(0, 4).map((list) => (
                  <div id="" key={list.listing_uid} onClick={() => handleModalView(list)}>
                    <ProductListItem item={list} />
                  </div>
                ))}
              </div>
            </div>

            <div className="savedSection">
              <h3>Saved Listings</h3>
              <div className="savedGrid">
                {savedListings.length >= 1 && savedListings.slice(0, 4).map((list) => (
                  <div id="" key={list.listing_uid} onClick={() => handleModalView(list)}>
                    <ProductListItem item={list} />
                  </div>
                ))}
              </div>
            </div>

            <div className="soldSection">
              <h3>Sold Listings</h3>
              <div className="soldGrid">
                {soldListings.length >= 1 && soldListings.slice(0, 4).map((list) => (
                  <div id="" key={list.listing_uid} onClick={() => handleModalView(list)}>
                    <ProductListItem item={list} />
                  </div>
                ))}
              </div>
            </div>


          {toggled && (
            <SingleModal handleToggle={handleToggle} toggled={toggled} item={currentItem}/>
          )} 
          <div onClick={() => overlayClose()} className="" id="overlay"></div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileListings;
