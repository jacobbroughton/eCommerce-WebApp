import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";
import ProductListItem from "../ProductList-Item/ProductList-Item";
import placeholderImg from "../../assets/download.jpg";

const BrowseProductList = ({ category, incomingListings }) => {
  const { statusUrl } = useAuth0();
  const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [resultNum, setResultNum] = useState(20);
  let [search, setSearch] = useState("");
  let [toggled, setToggled] = useState(false);
  const [limit, setLimit] = useState(0);
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    let newCategory = category.replace(/ /g, "-");
    setListings([...incomingListings]);
    if (category === "All For Sale") {
      axios
        .get(`${statusUrl}api/browsecount/all`)
        .then((res) => setLimit(res.data.COUNT))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${statusUrl}api/browsecount/${newCategory}`)
        .then((res) => setLimit(res.data.COUNT))
        .catch((err) => console.log(err));
    }
    window.scroll(0, 0);
  }, [category, incomingListings]);



  useEffect(() => {
    console.log(listings)
    console.log(listings.length)
    setLimit(listings.length)
  }, [listings])



  // Runs each time load more is clicked
  useEffect(() => {
    let newCategory = category.replace(/ /g, "-");
    if (category === "All For Sale") {
      axios
        .get(`${statusUrl}api/browse/all/${resultNum}`)
        .then((response) => setListings([...response.data]))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${statusUrl}api/browse/${newCategory}/${resultNum}`)
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    }
  }, [resultNum]);

  const handleModalView = (props) => {
    console.log("Handling modal view");
    console.log(props);
    setCurrentItem(props);
    setToggled(true);
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  };

  const handleToggle = () => {
    toggled ? setToggled(false) : setToggled(true);
  };

  const overlayClose = (e) => {
    const overlay = document.getElementById("overlay");
    setToggled(false);
    overlay.classList.remove("active");
  };

  const handleLoadMore = (e) => {
    setResultNum(resultNum + 20);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    // let searchArr = search.split(" ");
    // let uniqueSearchArr = [...new Set(searchArr)];
    axios
    .post(`${statusUrl}api/search`, {
      searchValue : search
    })
    .then(response => setListings(response.data))
    .catch(error => console.log(error))
    e.preventDefault()
  }

  if(listings === null || listings === {} || listings === "") {
    return  <div className="browsePMother">
    <div className="browsePMain">
      <div className="browsePHeadDiv">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={ search }
            onChange={(e) => handleSearch(e)}
            className="searchInput"
            placeholder="Search"
          />
          <input type="submit" placeholder="Search" className="searchBtn"/>
        </form>
      </div>
      <div className="browsePListingsNull">
          <h2 className="noListingsH">No listings available...</h2>
          <p>Please try different search terms</p>
      </div>
    </div>
  </div>
  }

  return (
    <div className="browsePMother">
      <div className="browsePMain">
        <div className="browsePHeadDiv">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              value={ search }
              onChange={(e) => handleSearch(e)}
              
              className="searchInput"
              placeholder="Search"
            />
            <input type="submit" placeholder="Search" className="searchBtn"/>
          </form>

          {category === "All" && <h3 className="browsePHead">All for Sale</h3>}
          {category === "" ? (
            <h3 className="browsePHead">Recent Listings</h3>
          ) : category !== "All" ? (
            <h3 className="browsePHead">{category}</h3>
          ) : (
            <> </>
          )}
        </div>

        <div className="browsePListings">
          {listings.map((list) => (
            <div
              id=""
              key={list.listing_uid}
              onClick={() => handleModalView(list)}
            >
              <ProductListItem item={list} />
            </div>
          ))}

          {toggled && (
            <SingleModal
              handleToggle={handleToggle}
              toggled={toggled}
              item={currentItem}
            />
          )}
          <div onClick={() => overlayClose()} className="" id="overlay"></div>
        </div>
        {listings.length !== limit && (
          <button className="loadMoreBtn" onClick={(e) => handleLoadMore(e)}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowseProductList;
