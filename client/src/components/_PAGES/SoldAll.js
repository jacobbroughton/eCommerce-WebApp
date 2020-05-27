import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
let API = require("../../api-calls");

const SoldAll = () => {

    let { dbUser } = useAuth0();
    const { serverUrl } = useStatusUrl();
    let [soldListings, setSoldListings] = useState([]);

    const getSoldListings = async () => {
        let res = await API.getSold(serverUrl, dbUser, "n")
        setSoldListings(res.data)
    }

    useEffect(() => {
            dbUser ? getSoldListings() : setSoldListings([])
    }, [dbUser])
    
    
    return(
        <>
            <h3>Your Sold Listings</h3>
            <Grid listings={soldListings} />
        </>
        
    )
}

export default SoldAll;