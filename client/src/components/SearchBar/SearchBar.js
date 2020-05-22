import React, { useState, useEffect } from "react";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";
import "./SearchBar.scss";

// resultNum is undefined
const SearchBar = ({ resultNum, handleSearchVal, handleSearchedBool, handleNewListings, searchVal }) => {
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


    const handleSubmit = (e) => {
      e.preventDefault();
      handleSearchedBool(true);
      handleSearchVal(search)
      let formattedSearch = search.replace(/\s/g, "-").toLowerCase();
      axios
        .get(`${serverUrl}/api/search/${formattedSearch}/${resultNum}`)
        .then((res) => handleNewListings(res.data))
        .catch((err) => console.log(err));
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