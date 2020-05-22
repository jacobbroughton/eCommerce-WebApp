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
  }
}



const BrowseWrapper = ({ category, items, single }) => {

  let initialState = {
    category: "",
    listings: [], 
    resultNum: 20,
    searchVal: ""
  }

  
  let [searched, setSearched] = useState(false);
  
  const [state, dispatch] = useReducer(BrowseWrapperReducer, initialState);

  
  const handleNewListings = (list) => {
    dispatch({ type: 'listings', payload: list })
  }

  const handleSearchVal = (val) => {
    dispatch({ type: 'search value', payload: val })
  }


  useEffect(() => {
    handleNewListings(items);
  }, [items])


  useEffect(() => {
    dispatch({ type: 'category click', payload: { category: category, resultNum: 20, searchVal: "" }})
  }, [])


  const handleSearchedBool = (bool) => setSearched(bool);


  const handleCatClick = (category) => {
    handleSearchedBool(false);
    dispatch({ type: 'category click', payload: { category: category, searchVal: "" }})
  };

  const handleLoadMore = () => dispatch({ type: "load more" });

  return (
    <div className="browseViewMother">
      <CategoryList handleCatClick={handleCatClick} />

      {single ? (
        <SinglePage />
      ) : (
        <div className="singleWrapper">
          <div className="searchWrapper">
            <SearchBar
              resultNum={state.resultNum}
              handleSearchedBool={handleSearchedBool}
              searchVal={state.searchVal}
              handleSearchVal={handleSearchVal}
              handleNewListings={handleNewListings}
            />
            {state.searchVal === "" ? <h3>{category}</h3> : <h3>'{state.searchVal}'</h3>}
          </div>
          <ProductList
            searched={searched}
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
  );
};

export default BrowseWrapper;
