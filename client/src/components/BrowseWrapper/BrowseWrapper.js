import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";
import SinglePage from "../SinglePage/SinglePage";
import SearchBar from "../SearchBar/SearchBar";
import CategoryList from "../CategoryList/CategoryList";
import "./BrowseWrapper.scss";

const BrowseWrapper = ({ category, categoryItems, single }) => {
  const [cat, setCat] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [listings, setListings] = useState([]);
  const [resultNum, setResultNum] = useState(20);
  let [searched, setSearched] = useState(false);

  const handleSearchedBool = (bool) => setSearched(bool);

  const handleCatClick = (category) => {
    setCat(category);
    handleSearchedBool(false);
    setResultNum(20);
    setSearchVal("");
  };

  const handleLoadMore = () => setResultNum(resultNum + 20);

  return (
    <div className="browseViewMother">
      <CategoryList handleCatClick={handleCatClick} />

      {single ? (
        <SinglePage />
      ) : (
        <div className="singleWrapper">
          <div className="searchWrapper">
            <SearchBar
              resultNum={resultNum}
              handleSearchedBool={handleSearchedBool}
              setListings={setListings}
              setSearchVal={setSearchVal}
              searchVal={searchVal}
            />
            {searchVal === "" ? <h3>{category}</h3> : <h3>'{searchVal}'</h3>}
          </div>

          <ProductList
            searched={searched}
            handleLoadMore={handleLoadMore}
            searchVal={searchVal}
            resultNum={resultNum}
            category={category}
            searchListings={listings}
            incomingListings={categoryItems}
          />
        </div>
      )}
    </div>
  );
};

export default BrowseWrapper;
