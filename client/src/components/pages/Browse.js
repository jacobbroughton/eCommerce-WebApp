import React, {useEffect, useState} from "react";
import { useAuth0 } from "../../contexts/auth0-context.js";
import axios from "axios";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"

const Browse = () => {
    const { statusUrl } = useAuth0();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
        .get(`${statusUrl}/api/browse/all/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
    }, [])

    return (
       <BrowseWrapper category={"All For Sale"} categoryItems={items}/>
    )
}

export default Browse;