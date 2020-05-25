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

    case 'modal toggle' : {
      return {
        currentItem: action.payload.currentItem,
        toggled: action.payload.toggled
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
    dispatch({ type: 'listings', payload: [...incomingListings] })

    let newCategory = category.replace(/ /g, "-");
    
      axios
        .get(`${serverUrl}/api/browsecount/${newCategory}`)
        .then((res) => setBrowseLimit(res.data.COUNT))
        .catch((err) => console.log(err));

    setTimeout(() => {
      setLoadBtn(true);
    }, 600);

    window.scroll(0, 0);
  }, [category, incomingListings]);



  useEffect(() => {
    let formattedSearch = searchVal.replace(/\s/g, "-").toLowerCase();
    if(formattedSearch !== undefined || formattedSearch !== "") {
      axios
      .get(`${serverUrl}/api/browsecount/search/${formattedSearch}`)
      .then(res => setSearchLimit(res.data.COUNT))
      .catch(err => console.log(err))
    }

  }, [searchVal])
  



  // useEffect(() => {
  //   // setListings([...searchListings]);
  //   dispatch({ type: 'listings', payload: [...searchListings] })
  // }, [searchListings]);



  // Runs each time load more is clicked
  useEffect(() => {
    console.log(resultNum)
    let newCategory = category.replace(/ /g, "-");
    if(searchVal !== "") {
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

  // useEffect(() => {
  //   console.log("Listings changed!")
  //   console.log(state.listings)
  // }, [state.listings])



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
            {toggled && (
              <SingleModal handleToggle={handleToggle} toggled={toggled} item={currentItem} />
            )}
            <div onClick={() => overlayClose()} className="" id="overlay"></div>
          </div>

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
