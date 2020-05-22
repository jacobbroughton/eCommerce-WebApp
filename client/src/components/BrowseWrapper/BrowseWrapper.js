import React, { useEffect, useState, useReducer} from "react";
import ProductList from "../ProductList/ProductList";
import SinglePage from "../SinglePage/SinglePage";
import SearchBar from "../SearchBar/SearchBar";
import CategoryList from "../CategoryList/CategoryList";
import "./BrowseWrapper.scss";

  
let BrowseWrapperReducer = (state, action) => {
  // console.log(this.props)
  console.log(action.payload)
  switch(action.type) {
    case "listings" : {
      console.log(state)
      return {
        ...state,
        listings: action.payload
      }
    }
    case "category click" : {
      console.log(action.payload)
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


  useEffect(() => {
    console.log(items)
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
