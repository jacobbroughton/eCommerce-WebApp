import React, { useState, useEffect } from "react";
import BrowseWrapper from "../BrowseWrapper/BrowseWrapper"
import { useStatusUrl } from "../../contexts/statusUrl-context";
import axios from "axios";

const CategoryView = props => {
    const { serverUrl } = useStatusUrl();
    const [items, setItems] = useState([]);
    let category = window.location.pathname.replace("/browse/category/", "");
    let newCategory = category.split("-").join(" ");


    useEffect(() => {
        category === "All-For-Sale" ? 
        axios
        .get(`${serverUrl}/api/browse/all/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
        :
        axios
        .get(`${serverUrl}/api/browse/${category}/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
    }, [newCategory])

    useEffect(() => {
        axios
        .get(`${serverUrl}/api/browse/all/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setItems(items)
    }, [items])



    return (
        <>
            <BrowseWrapper category={newCategory} categoryItems={items}/>
        </>
    )
}

export default CategoryView;