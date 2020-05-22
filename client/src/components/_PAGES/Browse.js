import React, {useEffect, useState} from "react";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"

const Browse = () => {
    const { serverUrl } = useStatusUrl();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
        .get(`${serverUrl}/api/browse/all/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
    }, [])


    return (
       <BrowseWrapper category={"All For Sale"} categoryItems={items}/>
    )
}

export default Browse;