import React, { useEffect, useState, useReducer} from "react";
import ProductList from "../ProductList/ProductList";
import SinglePage from "../SinglePage/SinglePage";
import SearchBar from "../SearchBar/SearchBar";
import CategoryList from "../CategoryList/CategoryList";
import "./BrowseWrapper.scss";



  // let initialState = {
  //   category: "",
  //   listings: [], 
  //   resultNum: 20,
  //   searchVal: ""
  // }


  
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
        // resultNum: action.payload.resultNum,
        // searchVal: action.payload.searchVal
      }
    }
    case "load more" : {
      return { 
        ...state,
        resultNum: state.resultNum + 20
      }
    }
    // case "search" : {
    //   return {
    //     searchVal: "mountain"
    //   }
    // }
  }
}



const BrowseWrapper = ({ category, categoryItems, single }) => {

  let initialState = {
    category: "",
    listings: [], 
    resultNum: 20,
    searchVal: ""
  }

  
  // const [cat, setCat] = useState("");
  const [searchVal, setSearchVal] = useState("");
  // const [resultNum, setResultNum] = useState(20);
  let [searched, setSearched] = useState(false);

  // const [listings, setListings] = useState([]);


  const [state, dispatch] = useReducer(BrowseWrapperReducer, initialState);
  console.log(state)

  useEffect(() => {
    dispatch({ type: 'listings', payload: categoryItems })
  }, [categoryItems])

  useEffect(() => {
    dispatch({ type: 'category click', payload: { category: category, resultNum: 20, searchVal: "" }})
  }, [])

  useEffect(() => {console.log("Hello")}, [state])


  const handleSearchedBool = (bool) => setSearched(bool);

  const handleCatClick = (category) => {
    handleSearchedBool(false);
    // setCat(category);
    // setResultNum(20);
    // setSearchVal("");
    // dispatch({ type: 'category click', payload: { category: category, resultNum: 20, searchVal: "" }})
    dispatch({ type: 'category click', payload: { category: category }})

  };

  const handleLoadMore = () => dispatch({ type: "load more" });

  return (
    
    <div className="browseViewMother">
      {console.log(state)}
      <CategoryList handleCatClick={handleCatClick} />

      {single ? (
        <SinglePage />
      ) : (
        <div className="singleWrapper">
          <div className="searchWrapper">
            <SearchBar
              resultNum={state.resultNum}
              handleSearchedBool={handleSearchedBool}
              // setListings={setListings}
              // setSearchVal={setSearchVal}
              searchVal={state.searchVal}
            />
            {/* {state.searchVal === "" ? <h3>{category}</h3> : <h3>'{state.searchVal}'</h3>} */}
          </div>
          {console.log(searchVal)}
          {console.log(state.resultNum)}
          {console.log(state.listings)}
          <ProductList
            searched={searched}
            handleLoadMore={handleLoadMore}
            searchVal={state.searchVal}
            resultNum={state.resultNum}
            category={category}
            searchListings={state.listings}
            incomingListings={categoryItems}
          />
        </div>
      )}
    </div>
  );
};

export default BrowseWrapper;
