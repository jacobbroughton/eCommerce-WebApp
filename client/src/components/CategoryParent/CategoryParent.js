import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";
import SinglePage from "../SinglePage/SinglePage";
import SearchBar from "../SearchBar/SearchBar";
import CategoryList from "../CategoryList/CategoryList";
import "./CategoryParent.scss";

const BrowseCategoryParent = ({ category, categoryItems, single }) => {
  const [cat, setCat] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [listings, setListings] = useState([]);
  const [resultNum, setResultNum] = useState(20);
  let [searched, setSearched] = useState(false);

  const handleSearchedBool = (bool) => setSearched(bool);

  const handleCatClick = (category) => {
    setCat(category)
    handleSearchedBool(false);
    setResultNum(20);
    setSearchVal("");
  }

  const handleLoadMore = () => setResultNum(resultNum + 20);

  

  return (
    <div className="browseViewMother">
      <CategoryList handleCatClick={handleCatClick}/>

      {!single && (
        <div className="singleWrapper">
          <div className="searchWrapper">
            <SearchBar resultNum={resultNum} handleSearchedBool={handleSearchedBool} setListings={setListings} setSearchVal={setSearchVal} searchVal={searchVal} />
            {searchVal === "" ? <h3>{category}</h3> : <h3>'{searchVal}'</h3>}
          </div>
          
          <ProductList searched={searched} handleLoadMore={handleLoadMore} searchVal={searchVal} resultNum={resultNum} category={category} searchListings={listings} incomingListings={categoryItems} />
          
          {/* <button className="loadMoreBtn" onClick={(e) => handleLoadMore(e)} style={{background: "blue", width: '200px', color: 'white', alignSelf: 'center', marginBottom: '30px', padding: '5px'}}>
              Load More : {resultNum2}
            </button> */}
        </div>
      )}
      {single && <SinglePage />}
    </div>
  );
};

export default BrowseCategoryParent;
