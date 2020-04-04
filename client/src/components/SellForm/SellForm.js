import React, {useState, useEffect} from "react";
import {useAuth0} from "../../contexts/auth0-context";
import PhotoTest from "../PhotoTest/PhotoTest";
import axios from "axios";
import moment from "moment";
import "./SellForm.scss";

const SellForm = () => {



    let categoryArr = ["Computers / Accessories", "Video Games", "Outdoors / Sports", "Cameras / Photography", "Musical Instruments", "Office Supplies", "Cell Phones", "Fashion / Jewelry", "Home / Garden", "Toys / Games", "Books", "Beauty"]
    let conditionArr = ["Used (fair)", "Used (good)", "Used (like new)", "New" ];
    let shippingArr = ["Will Ship Within US", "Local Only (Meet up)", "Local Only (Pickup)"]
    const { dbUser } = useAuth0();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0); // Consider type
    const [condition, setCondition] = useState(conditionArr[0]);
    const [shipping, setShipping] = useState(shippingArr[0]);
    const [category, setCategory] = useState(categoryArr[0]);
    const [description, setDescription] = useState("");

    const createRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      };
    
    const handleImgChange = (e) => {
        const previewImage = document.getElementById("imgPreview");
        const previewDefaultText = document.getElementById("defaultPreviewText")
        const file = e.target.files[0]; // Only allows one file, shows undefined if window is closed

        if(file) {
            const reader = new FileReader();

            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";

            reader.addEventListener("load", () => {

                console.log(reader);
                previewImage.setAttribute("src", reader.result);
            });

            reader.readAsDataURL(file);
        } else {
            previewDefaultText.style.display = null;
            previewImage.style.display = null;
            previewImage.setAttribute("src", "");
        }
    }

    const handleSubmit = e => {
    
        let time = moment().format("LT");
        let date = moment().format("L");
        let time_created = time.replace(/\s/g, "");
        let date_created = date.replace(/\//g, "-");
        
        axios
            .post(`http://localhost:5000/api/sell`, {
                listing_uid : createRandomInt(1000000000, 10000000000).toString(), 
                seller_uid : dbUser.user_uid,
                email: dbUser.email,
                seller_nickname: dbUser.nickname,
                title,
                description,
                image: null,
                price,
                item_condition: condition,
                category, 
                ship_status: shipping,
                date_created,
                time_created
            })
            .then(response => console.log(response))
            .catch(err => console.log(err))

        e.preventDefault();
    }
    
    return (
        <div className="sellFormMother">
            <PhotoTest/>
            <h3>Selling Something?</h3>
            <form onSubmit={e => handleSubmit(e)} className="sellForm" encType="multipart/form-data">
                <input required placeholder="What is the item you're selling?" onChange={(e) => setTitle(e.target.value)} className="titleInput"/>
                <input type="file" name="myFile" placeholder="Browse Files" className="imageInput" onChange={e => handleImgChange(e)} accept="image/png, image/jpeg, image/jpg"/>
                <div className="imgPreviewContainer" id="imgPreviewContainer">
                    <img src="" alt="Image Preview" id="imgPreview" className="imgPreview"/>
                    <span id="defaultPreviewText">Image Preview</span>
                </div>
                <input required placeholder="Price" onChange={(e) => setPrice(parseInt(e.target.value))} className="priceInput"/>
                <select onChange={(e) => setCondition(e.target.value)} className="conditionInput"> 
                {conditionArr.map(con => <option key={con} value={con}>{con}</option>)}
                </select>
                <select className="shippingInput" onChange={(e) => setShipping(e.target.value)}>
                {shippingArr.map(ship => <option key={ship} value={ship}>{ship}</option>)}
                </select>
                <select className="categoryInput" onChange={(e) => setCategory(e.target.value)}>
                    {categoryArr.map(cat => <option key={cat}  value={cat}>{cat}</option>)}
                </select>
                <textarea required placeholder="Describe the item you're selling..." onChange={(e) => setDescription(e.target.value)} className="descriptionInput"/>
                <input placeholder="Post"  type="submit"/>
            </form>
        </div>
    )
}

export default SellForm;