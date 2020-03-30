import React, {useState} from "react";

const SellForm = () => {

    const [price, setPrice] = useState(""); // Consider type
    const [condition, setCondition] = useState("");
    const [shipping, setShipping] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    let categoryArr = ["Computers / Accessories", "Video Games", "Outdoors / Sports", "Cameras / Photography", "Musical Instruments", "Office Supplies", "Cell Phones", "Fashion / Jewelry", "Home / Garden", "Toys / Games", "Books", "Beauty"]
 
    return (
        <div className="sellFormMother">
            <h3>Selling Something?</h3>
            <form className="sellForm">
                <input placeholder="What is the item you're selling?" className="titleInput"/>
                <input placeholder="Price" className="priceInput"/>
                <input placeholder="Condition" className="conditionInput"/>
                <input placeholder="Shipping" className="shippingInput"/>
                <input placeholder="Category" className="categoryInput"/>
                <textarea placeholder="Describe the item you're selling..." className="descriptionInput"/>
                <input placeholder="Post" type="submit"/>
            </form>
        </div>
    )
}

export default SellForm;