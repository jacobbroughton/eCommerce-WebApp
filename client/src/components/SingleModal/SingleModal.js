import React, { useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import placeholderImg from "../../assets/download.jpg";
import { Link } from "react-router-dom";
import "./SingleModal.scss";
const API = require("../../api-calls")


const SingleModal = ({ handleModalView, item, handleToggle }) => {
  const availArr = ["Available", "Pending", "Sold"];
  const { dbUser } = useAuth0();
  const { serverUrl, clientUrl } = useStatusUrl();
  let imageArr = [];
  const [image, setImage] = useState("");
  let [status, setStatus] = useState(item.status);  


  const handleClose = (e) => {
    handleModalView()
  };

  const handleAvailability = async (e) => {
    setStatus(e.target.value);
    await API.changeAvailability(serverUrl, item, status)
  }

  const shareListing = (str) => {
    let textArea = document.createElement('textarea');
    textArea.value = `${clientUrl}/browse/single/${item.listing_uid}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    let copiedPrompt = document.getElementById("copiedPrompt")
    copiedPrompt.classList.add("active");
    setTimeout(() => {
      copiedPrompt.classList.remove("active");
    }, 3000)
  }



  const saveListing = async () => {
    await API.saveListing(serverUrl, item, dbUser)
    window.location.reload();
  }



  const deleteListing = () => {
    API.deleteListing(serverUrl, item)
    window.location.reload()
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
      <div id="modalMother" className={`${item.status}Modal modalMother`}>
          <div className="modalMain">
          <h1 className="title">{item.title}</h1>
          <div className="imagesGenInfoDiv">
            <div className="imagesParent">
              {item.image === 'null' 
              ? <img className="singleImage" src={placeholderImg} alt=""/>
              : <img className="singleImage" src={serverUrl + "/" + imageArr[0]} alt="" />
            }

              {/* Side Images */}
              {imageArr.length > 1 && (
                <div className="sideImagesParent">
                  {imageArr.map((image) => (
                    <img
                      onClick={(e) => setImage(e.target.src)}
                      className="sideImage"
                      src={serverUrl + "/" + image}
                      alt=""
                      key={image}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="listingGenInfoParent">
            <p className={`${item.status} soldStatus`} >{item.status}</p>
              {/* <h1 className="title">{item.title}</h1> */}
              
              {/* <div className="availabilityDiv"> */}
                {/* <p>Change availability?</p> */}
                {/* { item.status !== "Available" && (
                  <button className="availableBtn" value="Available" onClick={(e) => setStatus(e.target.value)}>Available</button>
                )}

                { item.status !== "Pending" && (
                  <button className="pendingBtn" value="Pending" onClick={(e) => setStatus(e.target.value)}>Pending</button>
                )}

                { item.status !== "Sold" && (
                  <button className="soldBtn" value="Sold" onClick={(e) => setStatus(e.target.value)}>Sold</button>
                )} */}
              {/* </div> */}
              

              
              
              
              <div className="listingGenInfo">
                <div className="listingGenItem">
                  <p className="genInfoLabel">Price:</p>
                  <p className="genInfoP">&nbsp; ${item.price}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Condition: </p>
                  <p className="genInfoP">&nbsp; {item.item_condition}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Shipping:</p>
                  <p className="genInfoP">&nbsp; {item.ship_status}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Category:</p>
                  <p className="genInfoP">&nbsp; {item.category}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Located In:</p>
                  <p className="genInfoP">
                  &nbsp; {item.city}, {item.state}
                  </p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Listed By:</p>
                  <p className="genInfoP">&nbsp;@{item.seller_nickname}</p>
                </div>
                <div className="buttonsParent">
                  
                  { dbUser && !dbUser.saved_posts.includes(item.listing_uid) && item.seller_uid !== dbUser.user_uid && (
                    // <div className="saveBtnParent">
                    <button className="saveBtn" onClick={() => saveListing()}>Save</button>
                    // </div>
                  )}
                  <input type="text" id='copyText' onChange={() => {}} value={`${clientUrl}/browse/single/${item.listing_uid}`}/>

                  <div className="shareDiv">
                    <button className="shareBtn" onClick={(e) => shareListing(e)}>Share</button>
                    <p className="copiedPrompt" id="copiedPrompt">Copied to clipboard</p>
                  </div>

                  { dbUser && dbUser.user_uid === item.seller_uid && (
                    <button className="deleteBtn" onClick={(e) => deleteListing(e)}>Delete</button>
                  )}
                </div>

              </div>
            </div>
          </div>

          <hr />

          <div className="listingDescInfo">
            <p className="description">{item.description}</p>
            <p className="dateTime">
              Listed {item.date_created} {item.time_created}
            </p>
          </div>
          </div>
        <button className="closeBtn" onClick={(e) => handleClose(e)}>
          Close
        </button>
      </div>
    
  );
};

export default SingleModal;
