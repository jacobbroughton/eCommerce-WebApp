import React, { useState, useEffect } from "react";
import CategoryParent from "../CategoryParent/CategoryParent"
import { useAuth0 } from "../../contexts/auth0-context.js";
import axios from "axios";

const Single = props => {
    const { statusUrl } = useAuth0();
    const [item, setItem] = useState({});
    let listingUid = window.location.pathname.replace("/browse/single/", "")



    useEffect(() => {
        axios
        .get(`${statusUrl}api/browse/single/${listingUid}`)
        .then(res => setItem(res.data))
        .catch(err => console.log(err))
    }, [listingUid])



    return (
        <div>
            <CategoryParent single selectedProduct={item}/>
        </div>
    )
}

export default Single;