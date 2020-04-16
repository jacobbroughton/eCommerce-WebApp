import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import placeholderImg from "../../assets/download.jpg";
import axios from "axios";
// import moment from "moment";
import "./SingleModal.scss";

const SingleModal = (props) => {
  let { item } = props;
  const { statusUrl, dbUser } = useAuth0();
  let imageArr = [];
  const [image, setImage] = useState("");
  
  useEffect(() => {
    if(item === null) {
      console.log("This bitch null ")
    } else {
      console.log("Not null")
    }
  }, [item])

  const handleClose = (e) => {
    console.log(document.getElementById("modalMother").parentNode)
    document.getElementById("toggleDiv").style.display = "none";
    document.getElementById("toggleDiv2").style.display = "none";
    document.getElementById("overlay").classList.remove("active");
    setImage("")
  };

  const handleSave = () => {
    // let time = moment().format("LT");
    // let date = moment().format("L");
    // let time_saved = time.replace(/\s/g, "");
    // let date_saved = date.replace(/\//g, "-");

    axios
    .get(`${statusUrl}api/save/post/${item.listing_uid}/${dbUser.user_uid}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  if (item !== null) {
    imageArr = item.image.split(" ");
    for (let i = 0; i < imageArr.length; i++) {
      if (imageArr[i] === "") {
        imageArr.pop();
      }
    }
  }

  return (
    <div id="modalMother" className="modalMother">
      {console.log(item)}
      {item && (
        <div className="modalMain">
          <div className="imagesGenInfoDiv">
            <div className="imagesParent">
              {image === "" && item.image !== "null" ? (
                <img
                  className="singleImage"
                  src={statusUrl + imageArr[0]}
                  alt=""
                />
               ) : (
                item.image !== "null" &&
              (
                <img className="singleImage" src={image} alt="" />
              )              
              )} 
              {item.image === "null" && (
                <img className="singleImage" src={placeholderImg} alt=""/>
              )}

              {/* Side Images */}
              {imageArr.length > 1 && (
                <div className="sideImagesParent">
                  {imageArr.map((image) => (
                    <img
                      onClick={(e) => setImage(e.target.src)}
                      className="sideImage"
                      src={statusUrl + image}
                      alt=""
                      key={image}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="listingGenInfoParent">
              <h1 className="title">{item.title}</h1>
              <div className="listingGenInfo">
                <div className="listingGenItem">
                  <p className="genInfoLabel">Price</p>
                  <p className="genInfoP">${item.price}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Condition</p>
                  <p className="genInfoP">{item.item_condition}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Shipping</p>
                  <p className="genInfoP">{item.ship_status}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Category</p>
                  <p className="genInfoP">{item.category}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Located In</p>
                  <p className="genInfoP">
                    {item.city}, {item.state}
                  </p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Listed By</p>
                  <p className="genInfoP">{item.seller_nickname}</p>
                </div>
                <div className="saveBtnParent">
                  <button className="saveBtn" onClick={() => handleSave()}>Save</button>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="listingDescInfo">
            {/* <p>{item.city}, {item.state}</p> */}
            <p className="description">{item.description}</p>
            {/* <p>Listed by {item.seller_nickname}</p> */}
            <p className="dateTime">
              Listed {item.date_created} {item.time_created}
            </p>
          </div>
        </div>
      )}
      <button className="closeBtn" onClick={(e) => handleClose(e)}>
        Close
      </button>
    </div>
  );
};

export default SingleModal;
