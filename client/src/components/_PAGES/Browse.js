import React, {useEffect, useState} from "react";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper";
let API = require("../../api-calls");

const Browse = () => {
    const { serverUrl } = useStatusUrl();
    const [items, setItems] = useState([]);

    const getAllListings = async () => {
        let response = await API.getAll(serverUrl);
        console.log(response)
        setItems(response.data)
    }

    useEffect(() => {
        getAllListings()
    }, [])


    return (
        <>
            <h1>Jacob Broughton</h1>
            <BrowseWrapper category={"All For Sale"} categoryItems={items}/>
        </>
       
    )
}

export default Browse;