import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";

const SoldAll = () => {

    let { dbUser } = useAuth0();
    const { serverUrl } = useStatusUrl();
    let [soldListings, setSoldListings] = useState([]);

    useEffect(() => {
        if(!dbUser) {
            axios
            .get(`${serverUrl}/api/personallistings/sold/n/${dbUser.user_uid}`)
            .then(res => setSoldListings([...res.data]))
            .catch(err => console.log(err))
        }
    }, [dbUser])
    
    
    return(
        <>
            <h3>Your Sold Listings</h3>
            <Grid listings={soldListings} />
        </>
        
    )
}

export default SoldAll;