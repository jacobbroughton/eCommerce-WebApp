import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import {Link} from "react-router-dom"; 
import Grid from "../Grid/Grid";
import SingleModal from "../SingleModal/SingleModal";
import "./ProfileListings.scss";
let API = require("../../api-calls");

const ProfileListings = () => {
  const { dbUser } = useAuth0();
  const { serverUrl } = useStatusUrl();
  const [savedListings, setSavedListings] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  let [toggled, setToggled] = useState(false);

  useEffect(() => {
    fetchActiveListings();
    fetchSavedListings();
    fetchSoldListings();
  }, [dbUser, serverUrl]);



  const fetchSavedListings = async () => {
    let res = await API.getSaved(serverUrl, dbUser, "y")
    setSavedListings(res.data)
  };

  const fetchActiveListings = async () => {
    let res = await API.getActiveListings(serverUrl, dbUser, "y")
    setActiveListings(res.data)
  };

  const fetchSoldListings = async () => {
    let res = await API.getSold(serverUrl, dbUser, "y")
    setSoldListings(res.data)
  }

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    setToggled(false);
    overlay.classList.remove("active");
    document.body.style.overflow = "scroll";
  };

  const handleModalView = (props) => {
    setCurrentItem(props);
    setToggled(true);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
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
                  <Grid limited handleModalView={handleModalView} listings={activeListings} gridItemNum={4}/>
                  { activeListings.length > 4 && <Link to={`/profile/allactive`}>View All</Link> }
                </>
              )}
            </div>

            <div className="savedSection">
            {savedListings !== [] && (
                <>
                  <h3>Saved Listings</h3>
                  <Grid limited handleModalView={handleModalView} listings={savedListings} gridItemNum={4}/>
                  
                  { savedListings.length > 4 && <Link to={`/profile/allsaved`}>View All</Link> }
                </>
              )}
            </div>

            <div className="soldSection">
            {soldListings !== [] && (
                <>
                  <h3>Sold Listings</h3>
                  <Grid limited handleModalView={handleModalView} listings={soldListings} gridItemNum={4}/>
                  {console.log(soldListings)}
                  { soldListings.length > 4 && <Link to={`/profile/allsold`}>View All</Link> }
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
