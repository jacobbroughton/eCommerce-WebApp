import React, { useEffect, useState, useReducer} from "react";
import ProductList from "../ProductList/ProductList";
import SinglePage from "../SinglePage/SinglePage";
import SearchBar from "../SearchBar/SearchBar";
import CategoryList from "../CategoryList/CategoryList";
import "./BrowseWrapper.scss";

  
let BrowseWrapperReducer = (state, action) => {
  switch(action.type) {
    case "listings" : {
      return {
        ...state,
        listings: action.payload
      }
    }
    case "category click" : {
      return {
        ...state,
        category: action.payload.category,
        resultNum: action.payload.resultNum,
        searchVal: action.payload.searchVal
      }
    }
    case "load more" : {
      return { 
        ...state,
        resultNum: state.resultNum + 20
      }
    }
    case "search value" : {
      console.log(action.payload)
      return {
        ...state,
        searchVal: action.payload
      }
    }
    case "searched" : {
      return {
        ...state,
        searched: action.payload.searched
      }
    }
  }
}


const BrowseWrapper = ({ category, items, single }) => {


  let initialState = {
    category: "",
    listings: [], 
    resultNum: 20,
    searchVal: "",
    searched: false
  }

 const [state, dispatch] = useReducer(BrowseWrapperReducer, initialState);

 
 useEffect(() => {
   console.log(items);
   handleNewListings(items)
 }, [items])

  const handleNewListings = (list) => dispatch({ type: 'listings', payload: list })
  const handleSearchVal = (value) => dispatch({ type: 'search value', payload: value});
  const handleSearched = (bool) => dispatch({ type: 'searched' , payload: bool})
  const handleLoadMore = () => dispatch({ type: "load more" });
  const handleCatClick = (category) => {
    dispatch({ type: 'category click', payload: { category: category, resultNum: 20, searchVal: "" }})
  };

  return (
    <div className="browseViewMother">
      <div className="catsAndListParent">

      
      <CategoryList handleCatClick={handleCatClick} />

      {single ? (
        <SinglePage />
      ) : (
        <div className="singleWrapper">
          <div className="searchWrapper">
            <SearchBar
              resultNum={state.resultNum}
              handleSearched={handleSearched}
              searchVal={state.searchVal}
              handleSearchVal={handleSearchVal}
              handleNewListings={handleNewListings}
              category={category}
            />
            {state.searchVal === "" || state.searchVal === category ? <h3>{category}</h3> : <h3>'{state.searchVal}'</h3>}
          </div>

          <ProductList
            searched={state.searched}
            handleLoadMore={handleLoadMore}
            searchVal={state.searchVal}
            resultNum={state.resultNum}
            category={category}
            searchListings={state.listings}
            incomingListings={state.listings}
            handleNewListings={handleNewListings}
            listings={state.listings}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default BrowseWrapper;
