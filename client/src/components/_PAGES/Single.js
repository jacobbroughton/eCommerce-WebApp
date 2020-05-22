import React, { useState, useEffect } from "react";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";

const Single = props => {
    const { serverUrl } = useStatusUrl();
    const [item, setItem] = useState({});
    let listingUid = window.location.pathname.replace("/browse/single/", "")



    useEffect(() => {
        axios
        .get(`${serverUrl}/api/browse/single/${listingUid}`)
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