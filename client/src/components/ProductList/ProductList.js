import React, { useEffect, useState, useReducer } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import { Link, withRouter } from "react-router-dom";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";
import Grid from "../Grid/Grid";
let API = require("../../api-calls");

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

  const getCategoryBrowseCount = async (newCategoryArg) => {
    let res = await API.getCategoryBrowseCount(serverUrl, newCategoryArg)
    setBrowseLimit(res.data.COUNT)
  }

  const getSearchBrowseCount = async (formattedSearchArg) => {
    let res = await API.getSearchBrowseCount(serverUrl, formattedSearchArg)
    setSearchLimit(res.data.COUNT)
  } 

  const getSearchListings = async (formattedSearchArg) => {
    let res = await API.getSearchListings(serverUrl, formattedSearchArg, resultNum)
    dispatch({ type: 'listings', payload: res.data })
  }

  const getAllListings = async () => {
    let res = await API.getAll(serverUrl, resultNum);
    console.log(res)
    dispatch({ type: 'listings', payload: res.data })
  }

  const getCategoryListings = async (newCategory) => {
    let res = await API.getCategory(serverUrl, newCategory, resultNum);
    dispatch({ type: 'listings', payload: res.data })
  }

  useEffect(() => {
    dispatch({ type: 'listings', payload: [...incomingListings] })

    let newCategory = category.replace(/ /g, "-");
      getCategoryBrowseCount(newCategory);

    setTimeout(() => {
      setLoadBtn(true);
    }, 600);

    window.scroll(0, 0);
  // }, [category, incomingListings]);
}, [incomingListings]);



  useEffect(() => {
    let formattedSearch = searchVal.replace(/\s/g, "-").toLowerCase();
    if(formattedSearch !== undefined || formattedSearch !== "") {
      getSearchBrowseCount(formattedSearch);
    }
  }, [searchVal])
  


  // Runs each time load more is clicked
  useEffect(() => {
    console.log(resultNum)
    let newCategory = category.replace(/ /g, "-");
    if(searchVal !== "") {
      let formattedSearch = searchVal.replace(/\s/g, "-").toLowerCase();
      getSearchListings(formattedSearch);
    } else {
      category === "All For Sale" 
    ? 
      getAllListings()
    :
      getCategoryListings(newCategory)
    }

  }, [resultNum]);


  const handleModalView = (props) => {
    const overlay = document.getElementById("overlay")
    if(toggled) {
      setCurrentItem(null)
      setToggled(false)
      overlay.classList.remove("active")
      document.body.style.overflow = "initial"
    } else {
      setCurrentItem(props)
      setToggled(true)
      overlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }



  };

  const handleToggle = () => toggled ? setToggled(false) : setToggled(true)

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    setToggled(false);
    overlay.classList.remove("active");
    document.body.style.overflow = "initial";
  };

    return (
      <div className="browsePMother">
        <div className="browsePMain">
          <div className="browsePListings">
          <Grid handleModalView={handleModalView} listings={state.listings} gridItemNum={resultNum}/>
            {toggled && (
              <SingleModal handleModalView={handleModalView} handleToggle={handleToggle} toggled={toggled} item={currentItem} />
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
