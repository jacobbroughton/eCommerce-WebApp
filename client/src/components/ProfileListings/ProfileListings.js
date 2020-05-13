import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
// import ProductListItem from "../ProductListItem/ProductListItem"
import {Link} from "react-router-dom"; 
import placeholderImg from "../../assets/download.jpg";
import Grid from "../Grid/Grid";
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
      .get(`${statusUrl}/api/save/get/${dbUser.user_uid}`)
      .then((response) => setSavedListings([...response.data]))
      .catch((err) => console.log(err));
  };



  const fetchActiveListings = () => {
    axios
      .get(`${statusUrl}/api/personallistings/${dbUser.user_uid}`)
      .then((response) => setActiveListings([...response.data].reverse()))
      .catch((err) => console.log(err));
  };

  const fetchSoldListings = () => {
    axios
    .get(`${statusUrl}/api/personallistings/sold/${dbUser.user_uid}`)
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
              {activeListings !== [] && (
                <>
                  <h3>Your Listings</h3>
                  <Grid listings={activeListings} gridItemNum={4}/>
                  <Link to={`/profile/allactive`}>View All</Link>
                </>
              )}
            </div>

            <div className="savedSection">
            {savedListings !== [] && (
                <>
                  <h3>Saved Listings</h3>
                  <Grid listings={savedListings} gridItemNum={4}/>
                  <Link to={`/profile/allsaved`}>View All</Link>
                </>
              )}
            </div>

            <div className="soldSection">
            {soldListings !== [] && (
                <>
                  <h3>Your Listings</h3>
                  <Grid listings={soldListings} gridItemNum={4}/>
                  <Link to={`/profile/allsold`}>View All</Link>
                </>
              )}
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
