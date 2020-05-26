import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";

const SavedAll = () => {

    let { dbUser } = useAuth0();
    let { serverUrl } = useStatusUrl();
    let [savedListings, setSavedListings] = useState([]);

    useEffect(() => {
        if(dbUser) {
            axios
            .get(`${serverUrl}/api/save/get/n/${dbUser.user_uid}`)
            .then(res => setSavedListings([...res.data]))
            .catch(err => console.log(err))
        }
    }, [dbUser])
    
    return(
        <>
        <h3>Your Saved Listings</h3>
        <Grid listings={savedListings} />
        </>
        
    )
}

export default SavedAll;