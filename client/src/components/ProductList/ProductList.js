import React, { useEffect, useState, useReducer } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";
import Grid from "../Grid/Grid";

const ProductListReducer = (state, action) => {
  switch(action.type) {
    case 'listings' : {
      return {
        listings: action.payload
      }
    }
  }
}

const ProductList = ({ searched, handleLoadMore, searchVal, resultNum, category, searchListings, incomingListings }) => {
  const { serverUrl } = useStatusUrl();
  // const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  let [searchLimit, setSearchLimit] = useState(0)
  let [browseLimit, setBrowseLimit] = useState(0);
  let [loadBtn, setLoadBtn] = useState(false);
  let [toggled, setToggled] = useState(false);

  let initialState = {
    listings: [],
    currentItem: null,
    searchLimit: 0,
    browseLimit: 0,
    loadBtn: false,
    toggled: false
  }

  let [state, dispatch] = useReducer(ProductListReducer, initialState);


  useEffect(() => {
    console.log(incomingListings)
    // setListings([...incomingListings]);
    dispatch({ type: 'listings', payload: [...incomingListings] })

    let newCategory = category.replace(/ /g, "-");
    if (category === "All For Sale") {
      axios
        .get(`${serverUrl}/api/browsecount/all`)
        .then((res) => setBrowseLimit(res.data.COUNT))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${serverUrl}/api/browsecount/${newCategory}`)
        .then((res) => setBrowseLimit(res.data.COUNT))
        .catch((err) => console.log(err));
    }

    setTimeout(() => {
      setLoadBtn(true);
    }, 400);

    window.scroll(0, 0);
  }, [category, incomingListings]);



  useEffect(() => {
    // if(searchVal !== undefined) {
    axios
    .get(`${serverUrl}/api/browsecount/search/${searchVal}`)
    .then(res => setSearchLimit(res.data.COUNT))
    .catch(err => console.log(err))
    // }

  }, [searchVal])
  



  useEffect(() => {
    // setListings([...searchListings]);
    dispatch({ type: 'listings', payload: [...searchListings] })
  }, [searchListings]);



  // Runs each time load more is clicked
  useEffect(() => {
    console.log(resultNum)
    let newCategory = category.replace(/ /g, "-");
    if(searched) {
      let formattedSearch = searchVal.replace(/\s/g, "-").toLowerCase();
      axios
        .get(`${serverUrl}/api/search/${formattedSearch}/${resultNum}`)
        .then((res) => dispatch({ type: 'listings', payload: [...res.data] }))
        .catch((err) => console.log(err));
    } else {
      category === "All For Sale" 
    ? 
      axios
        .get(`${serverUrl}/api/browse/all/${resultNum}`)
        .then((res) => dispatch({ type: 'listings', payload: [...res.data] }))
        .catch((err) => console.log(err))
    :
      axios
        .get(`${serverUrl}/api/browse/${newCategory}/${resultNum}`)
        .then((res) => dispatch({ type: 'listings', payload: [...res.data] }))
        .catch((err) => console.log(err));
    }

  }, [resultNum]);

  useEffect(() => {
    console.log("Listings changed!")
    console.log(state.listings)
  }, [state.listings])



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
          <Grid handleModalView={handleModalView} listings={state.listings} gridItemNum={resultNum}/>
            {/* <Grid handleModalView={handleModalView} listings={listings} gridItemNum={resultNum}/> */}
            {toggled && (
              <SingleModal handleToggle={handleToggle} toggled={toggled} item={currentItem} />
            )}
            <div onClick={() => overlayClose()} className="" id="overlay"></div>
          </div>

          {console.log("=========================")}
          {console.log(`Listings: ${state.listings.length}`)}
          {console.log(`Search limit: ${searchLimit}`)}
          {console.log(`browseLimit: ${browseLimit}`)}
          {console.log(`loadBtn: ${loadBtn}`)}

          {state.listings.length !== searchLimit && state.listings.length !== browseLimit && loadBtn && (
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
