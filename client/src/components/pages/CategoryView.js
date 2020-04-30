import React, { useState, useEffect } from "react";
import CategoryParent from "../CategoryParent/CategoryParent"
import { useAuth0 } from "../../contexts/auth0-context.js";
import axios from "axios";

const CategoryView = props => {
    const { statusUrl } = useAuth0();
    const [items, setItems] = useState([]);
    let category = window.location.pathname.replace("/browse/category/", "");
    let newCategory = category.split("-").join(" ");


    useEffect(() => {
        category === "All-For-Sale" ? 
        axios
        .get(`${statusUrl}api/browse/all/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
        :
        axios
        .get(`${statusUrl}api/browse/${category}/20`)
        .then(res => setItems([...res.data]))
        .catch(err => console.log(err))
    }, [newCategory])



    return (
        <div>
            {console.log(items)}
            <CategoryParent category={newCategory} categoryItems={items}/>
        </div>
    )
}

export default CategoryView;