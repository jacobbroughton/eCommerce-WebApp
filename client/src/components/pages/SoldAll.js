import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";

const SoldAll = () => {

    let { statusUrl, dbUser } = useAuth0();
    let [soldListings, setSoldListings] = useState([]);

    useEffect(() => {
        if(!dbUser) {
            console.log("No")
        } else {
            console.log("Yes")
            axios
            .get(`${statusUrl}/api/personallistings/sold/${dbUser.user_uid}`)
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