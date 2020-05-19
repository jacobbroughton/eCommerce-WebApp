import React, { useState, useEffect } from "react";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"
import { useAuth0 } from "../../contexts/auth0-context.js";
import axios from "axios";

const Single = props => {
    const { statusUrl } = useAuth0();
    const [item, setItem] = useState({});
    let listingUid = window.location.pathname.replace("/browse/single/", "")



    useEffect(() => {
        axios
        .get(`${statusUrl}/api/browse/single/${listingUid}`)
        .then(res => setItem(res.data))
        .catch(err => console.log(err))
    }, [listingUid])



    return (
        <>
            <BrowseWrapper single selectedProduct={item}/>
        </>
    )
}

export default Single;