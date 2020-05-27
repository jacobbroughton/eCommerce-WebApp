import React, { useState, useEffect } from "react";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"
import { useStatusUrl } from "../../contexts/statusUrl-context";
let API = require("../../api-calls");

const Single = props => {
    const { serverUrl } = useStatusUrl();
    const [item, setItem] = useState({});
    let listingUid = window.location.pathname.replace("/browse/single/", "")

    const getSingleListing = async () => {
        let res = await API.getSingle(serverUrl, listingUid);
        setItem(res.data)
    }

    useEffect(() => {
        getSingleListing();
    }, [listingUid])



    return (
        <BrowseWrapper single selectedProduct={item}/>
    )
}

export default Single;