import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
let API = require("../../api-calls");

const ActiveAll = () => {

    let { dbUser } = useAuth0();
    let { serverUrl } = useStatusUrl()
    let [availableListings, setActiveListings] = useState([]);

    let getActives = async() => {
        let response = await API.getActiveListings(serverUrl, dbUser) 
        setActiveListings(response.data)
    }


    useEffect(() => {

        dbUser && getActives();

    }, [dbUser])
    
    return(
        <Grid listings={availableListings} />
        
    )
}

export default ActiveAll;