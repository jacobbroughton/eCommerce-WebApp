import React, { useState, useEffect } from "react";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import "./SearchBar.scss";
let API = require("../../api-calls");

// resultNum is undefined
const SearchBar = ({ resultNum, handleSearchVal, handleSearched, handleNewListings, searchVal, category }) => {
    const { serverUrl } = useStatusUrl();
    let [search, setSearch] = useState("");

    useEffect(() => {
        if(searchVal === "") {
            setSearch("")
        }
    }, [searchVal])

    const handleSearch = (e) => {
      setSearch(e.target.value);
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      if(search === "") {
        let res = await API.getAll(serverUrl, resultNum)
        handleSearchVal(category)
        handleNewListings(res.data)
      } else {
        handleSearched(true);
        handleSearchVal(search)
        let formattedSearch = search.replace(/\s/g, "-").toLowerCase()
        let res = await API.getSearchListings(serverUrl, formattedSearch, resultNum)
        handleNewListings(res.data)

      }
    };



    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={search}
          onChange={(e) => handleSearch(e)}
          className="searchInput"
          placeholder="Search"
        />

        <button type="submit" placeholder="Search" className="searchBtn">
          Search
        </button>
      </form>
    )
}


export default SearchBar;