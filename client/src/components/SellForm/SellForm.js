import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import moment from "moment";
import ListedModal from "../ListedModal/ListedModal";
import "./SellForm.scss";
let API = require("../../api-calls");

const SellForm = () => {
  let categoryArr = [
    "Select Category",
    "Computers & Accessories",
    "Video Games",
    "Outdoors & Sports",
    "Cameras & Equipment",
    "Musical Instruments",
    "Office Supplies",
    "Cell Phones",
    "Fashion & Jewelry",
    "Home & Garden",
    "Toys & Games",
    "Books",
    "Beauty"
  ];
  let conditionArr = ["Select Condition", "Used (fair)", "Used (good)", "Used (like new)", "New"];
  let shippingArr = [
    "Select Shipping",
    "Will Ship Within US",
    "Local Only (Meet up)",
    "Local Only (Pickup)"
  ];
  let priceOfferArr = ["Select offer options", "Firm", "Reasonable offers only", "Any offer"];
  let tradeArr = ["Select trade options", "No Trades", "Will consider category related Trades", "Will consider any Trade"]

  const { dbUser } = useAuth0();
  const { serverUrl } = useStatusUrl();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0); // Consider type
  const [condition, setCondition] = useState(conditionArr[0]);
  const [shipping, setShipping] = useState(shippingArr[0]);
  const [category, setCategory] = useState(categoryArr[0]);
  const [trades, setTrades] = useState(tradeArr[0]);
  const [priceOffer, setPriceOffer] = useState(priceOfferArr[0]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState();
  const [num, setNum] = useState("");
  const imagePrevNum = ["", "", "", ""];

  const createRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // useEffect(() => {
  //   let randomNum = createRandomInt(1000000000, 10000000000).toString();
  //   setNum(randomNum);
  // }, [])


  const handleImgChange = async e => {
    console.log(file)
    console.log(files)
    let previewTextArr = [].slice.call(document.getElementsByClassName("defaultPreviewText"))
    let previewArr = [].slice.call(document.getElementsByClassName("imgPreview"));
    let selectedFile = e.target.files[0]; // Only allows one file, shows undefined if window is closed
    let selectedFiles = e.target.files;
    setFile(selectedFile);
    setFiles(selectedFiles)
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    const reader3 = new FileReader();
    const reader4 = new FileReader();
    let readerArr = [reader1, reader2, reader3, reader4];

    for(let i = 0; i < selectedFiles.length; i++) {
      previewTextArr[i].style.display = "none";
      previewArr[i].style.display = "block";
      readerArr[i].addEventListener("load", () => {
        previewArr[i].setAttribute("src", readerArr[i].result);
      });
      readerArr[i].readAsDataURL(selectedFiles[i]);
    }
  };



  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    let randomNum = createRandomInt(1000000000, 10000000000).toString();
    // setNum(randomNum);
    console.log(num)

    // files.length !== 0 &&
    formData.append("myFile", files[0]);
    if(files[1]){ formData.append("myFile", files[1]); }
    if(files[2]){ formData.append("myFile", files[2]); }
    if(files[3]){ formData.append("myFile", files[3]); }


    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };



    let time = moment().format("LT");
    let date = moment().format("L");
    let time_created = time.replace(/\s/g, "");
    let date_created = date.replace(/\//g, "-");




    const sendTextInputValues = async () => {

      let formattedTags = tags.replace(/\s/g, ",").split(",").toString();
      console.log(formattedTags)

      let obj = {
          listing_uid: randomNum,
          seller_uid: dbUser.user_uid,
          email: dbUser.email,
          seller_nickname: dbUser.nickname,
          city: dbUser.town,
          state: dbUser.state,
          title,
          description,
          image: null,
          price,
          item_condition: condition,
          category,
          ship_status: shipping,
          firmness: priceOffer,
          trades,
          tags: formattedTags,
          sold_status : "Available",
          date_created,
          time_created
        }

      await API.handleSellFormText(serverUrl, obj)
    };



    let sendImageInputValues = async () => {
        console.log(randomNum)
        await API.handleSellFormMedia(serverUrl, formData, randomNum, config)

    };



    Promise.all([ sendTextInputValues(), sendImageInputValues() ])
    .then(([value]) =>  console.log(value))
    .catch(error => console.log(error));


    document.getElementById("sellModalParent").style.display = "block";
    document.getElementById("sellOverlay").classList.add("active");
  };



  return (
    <div className="sellFormMother">
      <form
        onSubmit={e => handleSubmit(e)}
        className="sellForm"
        encType="multipart/form-data"
      >


        {/* Title */}
        <input
          required
          placeholder="What is the item you're selling?"
          onChange={e => setTitle(e.target.value)}
          className="titleInput"
        />


        {/* File input */}
        <input
          type="file"
          name="myFile"
          placeholder="Browse Files"
          className="imageInput"
          onChange={e => handleImgChange(e)}
          accept="image/png, image/jpeg, image/jpg"
          multiple
        />


        {/* Preview Grid */}
        <div className="previewGrid">
          { imagePrevNum.map(() => 
            <div className="imgPreviewContainer" key="" id="imgPreviewContainer">
            <img
              src=""
              alt=""
              id="imgPreview"
              className="imgPreview"
            />
            <span className="defaultPreviewText" id="defaultPreviewText">Image</span>
          </div>
          )}
        </div>


        {/* Price */}
        <input
          required
          placeholder="Price"
          onChange={e => setPrice(parseInt(e.target.value))}
          className="priceInput"
        />


        {/* Condition */}
        <select
          onChange={e => setCondition(e.target.value)}
          className="conditionInput"
        >
          {conditionArr.map(con => (
            <option key={con} value={con}>
              {con}
            </option>
          ))}
        </select>


        {/* Shipping */}
        <select
          className="shippingInput"
          onChange={e => setShipping(e.target.value)}
        >
          {shippingArr.map(ship => (
            <option key={ship} value={ship}>
              {ship}
            </option>
          ))}
        </select>


        {/* Category */}
        <select
          className="categoryInput"
          onChange={e => setCategory(e.target.value)}
        >
          {categoryArr.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>


        {/* Offers */}
        <select
          className="priceOfferInput"
          onChange={e => setPriceOffer(e.target.value)}
        >
          {priceOfferArr.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Trades */}
        <select
          className="tradeInput"
          onChange={e => setTrades(e.target.value)}
        >
          {tradeArr.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>


        {/* Description */}
        <textarea
          required
          placeholder="Describe the item you're selling..."
          onChange={e => setDescription(e.target.value)}
          className="descriptionInput"
        />

        {/* Tags */}
        <input className="tagsInput" placeholder="Tags (e.g. 'mountain bike mtb biking')" maxLength="100" onChange={e => setTags(e.target.value)}/>


        {/* Submit */}
        <input className="postForSaleBtn" placeholder="Post" type="submit" />

          

      </form>
      <div className="sellModalParent" id="sellModalParent">
       <ListedModal/>
      </div>
      {/* Add overlay here */}
      <div className="" id="sellOverlay"></div>
    </div>
  );
};

export default SellForm;
