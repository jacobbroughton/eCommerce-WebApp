import React, { useState, useEffect } from "react";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"
import { useStatusUrl } from "../../contexts/statusUrl-context";
let API = require("../../api-calls");

const CategoryView = props => {
    const { serverUrl } = useStatusUrl();
    const [items, setItems] = useState([]);
    let category = window.location.pathname.replace("/browse/category/", "");
    let newCategory = category.split("-").join(" ");

    let getAllListings = async () => {
        let res = await API.getAll(serverUrl, 20);
        setItems(res.data)
    }

    let getCategoryListings = async () => {
        let res = await API.getCategory(serverUrl, category, 20);
        setItems(res.data)
    }


    useEffect(() => { 
        category === "All-For-Sale" ? 
            getAllListings()
            :
            getCategoryListings()
    }, [newCategory])

    useEffect(() => {
        getAllListings()
    }, [])


    return (
        <BrowseWrapper category={newCategory} items={items}/>
    )
}

export default CategoryView;