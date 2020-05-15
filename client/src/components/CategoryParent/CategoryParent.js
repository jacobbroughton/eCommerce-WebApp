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

  const handleCatClick = (category) => {
    setCat(category)
    setSearchVal("");
  }

  return (
    <div className="browseViewMother">
      <CategoryList handleCatClick={handleCatClick}/>

      {!single && (
        <div className="singleWrapper">
          <div className="searchWrapper">
            <SearchBar setListings={setListings} setSearchVal={setSearchVal} searchVal={searchVal} />
            {searchVal === "" ? <h3>{category}</h3> : <h3>'{searchVal}'</h3>}
          </div>
          
          <ProductList category={category} searchListings={listings} incomingListings={categoryItems} />
        </div>
      )}
      {single && <SinglePage />}
    </div>
  );
};

export default BrowseCategoryParent;
