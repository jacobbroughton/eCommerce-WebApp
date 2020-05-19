import React, { useState, useEffect } from "react";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";
import "./SearchBar.scss";

const SearchBar = ({ resultNum, handleSearchedBool, setListings, setSearchVal, searchVal }) => {
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
        setSearchVal(search);
        handleSearchedBool(true);
        let formattedSearch = search.replace(/\s/g, "-").toLowerCase();
        axios
          .get(`${serverUrl}/api/search/${formattedSearch}/${resultNum}`)
          .then((res) => setListings(res.data))
          .catch((err) => console.log(err));
    
        e.preventDefault();
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