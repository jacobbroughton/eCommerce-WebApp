import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";
import Grid from "../Grid/Grid";

const ProductList = ({ searched, handleLoadMore, searchVal, resultNum, category, searchListings, incomingListings }) => {
  const { statusUrl } = useAuth0();
  const { serverUrl, clientUrl } = useStatusUrl();
  const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  let [searchLimit, setSearchLimit] = useState()
  let [browseLimit, setBrowseLimit] = useState(0);
  let [loadBtn, setLoadBtn] = useState(false);
  let [toggled, setToggled] = useState(false);



  useEffect(() => {

    setListings([...incomingListings]);

    let newCategory = category.replace(/ /g, "-");
    if (category === "All For Sale") {
      axios
        .get(`${statusUrl}/api/browsecount/all`)
        .then((res) => setBrowseLimit(res.data.COUNT))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${statusUrl}/api/browsecount/${newCategory}`)
        .then((res) => setBrowseLimit(res.data.COUNT))
        .catch((err) => console.log(err));
    }

    setTimeout(() => {
      setLoadBtn(true);
    }, 400);

    window.scroll(0, 0);
  }, [category, incomingListings]);



  useEffect(() => {
    axios
    .get(`${statusUrl}/api/browsecount/search/${searchVal}`)
    .then(res => setSearchLimit(res.data.COUNT))
    .catch(err => console.log(err))
  }, [searchListings])



  useEffect(() => {
    setListings([...searchListings]);
  }, [searchListings]);



  // Runs each time load more is clicked
  useEffect(() => {
    let newCategory = category.replace(/ /g, "-");
    if(searched) {
      let formattedSearch = searchVal.replace(/\s/g, "-").toLowerCase();
      axios
        .get(`${statusUrl}/api/search/${formattedSearch}/${resultNum}`)
        .then((res) => setListings([...res.data]))
        .catch((err) => console.log(err));
    } else {
          category === "All For Sale" 
    ? 
      axios
        .get(`${statusUrl}/api/browse/all/${resultNum}`)
        .then((response) => setListings([...response.data]))
        .catch((err) => console.log(err))
    :
      axios
        .get(`${statusUrl}/api/browse/${newCategory}/${resultNum}`)
        .then((response) => setListings([...response.data]))
        .catch((err) => console.log(err));
    }

  }, [resultNum]);

  const handleModalView = (props) => {
    setCurrentItem(props);
    setToggled(true);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  };

  const handleToggle = () => (toggled ? setToggled(false) : setToggled(true));

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    setToggled(false);
    overlay.classList.remove("active");
  };

    return (
      <div className="browsePMother">
        <div className="browsePMain">
          <div className="browsePListings">
            <Grid handleModalView={handleModalView} listings={listings} gridItemNum={resultNum}/>
            {toggled && (
              <SingleModal handleToggle={handleToggle} toggled={toggled} item={currentItem} />
            )}
            <div onClick={() => overlayClose()} className="" id="overlay"></div>
          </div>
          {listings.length !== searchLimit && listings.length !== browseLimit && loadBtn && (
            <button className="loadMoreBtn" onClick={(e) => handleLoadMore(e)}>
              Load More
            </button>
           )}

        </div>
      </div>
    );
  // }
};

export default withRouter(ProductList);
