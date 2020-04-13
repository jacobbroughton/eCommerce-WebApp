import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import placeholderImg from "../../assets/download.jpg";
import "./SingleModal.scss";

const SingleModal = (props) => {
  let { item } = props;
  const { statusUrl } = useAuth0();
  let imageArr = [];
  const [image, setImage] = useState("");
  
  useEffect(() => {
    console.log(image)
  }, [image])

  const handleClose = (e) => {
    document.getElementById("modalMother").parentNode.style = "none";
    setImage("")
  };

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
                <img className="singleImage" src={placeholderImg}/>
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
