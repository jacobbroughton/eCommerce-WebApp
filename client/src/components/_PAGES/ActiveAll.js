import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import "./styles/ActiveAll.scss";
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
        <div className="activeAllMother">
            <h3>Your Active Listings</h3>
             <Grid listings={availableListings} />
        </div>
       
        
    )
}

export default ActiveAll;