import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import "./styles/SavedAll.scss";
let API = require("../../api-calls");

const SavedAll = () => {

    let { dbUser } = useAuth0();
    let { serverUrl } = useStatusUrl();
    let [savedListings, setSavedListings] = useState([]);

    const getSavedListings = async () => {
        let res = await API.getSaved(serverUrl, dbUser, "n")
        setSavedListings(res.data)
    }

    useEffect(() => {
        dbUser && getSavedListings();
    }, [dbUser])
    
    return(
        <div className="savedAllMother">
            <h3>Your Saved Listings</h3>
            <Grid listings={savedListings} />
        </div>
        
    )
}

export default SavedAll;