import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";

const SavedAll = () => {

    let { statusUrl, dbUser } = useAuth0();
    let [savedListings, setSavedListings] = useState([]);

    useEffect(() => {
        if(!dbUser) {
            console.log("No")
        } else {
            console.log("Yes")
            axios
            .get(`${statusUrl}/api/save/get/${dbUser.user_uid}`)
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