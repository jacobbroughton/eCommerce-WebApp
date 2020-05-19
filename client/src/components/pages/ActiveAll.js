import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";

const ActiveAll = () => {

    let { dbUser } = useAuth0();
    let { serverUrl } = useStatusUrl()
    let [availableListings, setActiveListings] = useState([]);

    useEffect(() => {
        if(!dbUser) {
            console.log("No")
        } else {
            console.log("Yes")
            axios
            .get(`${serverUrl}/api/personallistings/available/${dbUser.user_uid}`)
            .then(res => setActiveListings([...res.data]))
            .catch(err => console.log(err))
        }
    }, [dbUser])
    
    return(
        <>
        <h3>Your Available Listings</h3>
        <Grid listings={availableListings} />
        </>
        
    )
}

export default ActiveAll;