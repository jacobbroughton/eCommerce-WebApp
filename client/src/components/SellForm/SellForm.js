import React, {useState} from "react";
import {useAuth0} from "../../contexts/auth0-context";
import axios from "axios";
import moment from "moment";
import "./SellForm.scss";

const SellForm = () => {

    const { dbUser } = useAuth0();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0); // Consider type
    const [condition, setCondition] = useState("");
    const [shipping, setShipping] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    let categoryArr = ["Computers / Accessories", "Video Games", "Outdoors / Sports", "Cameras / Photography", "Musical Instruments", "Office Supplies", "Cell Phones", "Fashion / Jewelry", "Home / Garden", "Toys / Games", "Books", "Beauty"]
    let conditionArr = ["Used (fair)", "Used (good)", "Used (like new)", "New" ];
    let shippingArr = ["Will Ship Within US", "Local Only (Meet up)", "Local Only (Pickup)"]

    const createRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      };
    

    const handleSubmit = e => {

        for(let i = 0; i < price.length; i++) {
            console.log(i/3);
        }

        let formattedPrice = "$" + price;
        let time = moment().format("LT");
        let date = moment().format("L");
        let time_created = time.replace(/\s/g, "");
        let date_created = date.replace(/\//g, "-");
        
        axios
            .post(`http://localhost:5000/api/sell/${dbUser.user_uid}`, {
                listing_uid : createRandomInt(1000000000, 10000000000), 
                seller_uid : dbUser.user_uid,
                email: dbUser.email,
                seller_nickname: dbUser.nickname,
                title,
                description,
                price: formattedPrice,
                condition,
                category, 
                ship_status: shipping,
                date_created,
                time_created
            })

        e.preventDefault();
    }
    
    return (
        <div className="sellFormMother">
            <h3>Selling Something?</h3>
            <form onSubmit={e => handleSubmit(e)} className="sellForm">
                <input placeholder="What is the item you're selling?" onChange={(e) => setTitle(e.target.value)} className="titleInput"/>
                <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} className="priceInput"/>
                <select onChange={(e) => setCondition(e.target.value)} className="conditionInput">
                {conditionArr.map(con => <option key={con} value={con}>{con}</option>)}
                </select>
                <select className="shippingInput" onChange={(e) => setShipping(e.target.value)}>
                {shippingArr.map(ship => <option key={ship} value={ship}>{ship}</option>)}
                </select>
                <select className="categoryInput" onChange={(e) => setCategory(e.target.value)}>
                    {categoryArr.map(cat => <option key="cat"  value={cat}>{cat}</option>)}
                </select>
                <textarea placeholder="Describe the item you're selling..." onChange={(e) => setDescription(e.target.value)} className="descriptionInput"/>
                <input placeholder="Post"  type="submit"/>
            </form>
        </div>
    )
}

export default SellForm;