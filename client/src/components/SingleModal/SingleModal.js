import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import placeholderImg from "../../assets/download.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "./SingleModal.scss";



const SingleModal = ({ item, handleToggle }) => {
  const availArr = ["Available", "Pending", "Sold"];
  const { statusUrl, dbUser } = useAuth0();
  let imageArr = [];
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(item.status);  

  const handleClose = (e) => {
    document.getElementById("overlay").classList.remove("active");
    setImage("");
    handleToggle();

    // Window location testing, removes product url
    console.log(window.location.pathname)
    let winP = window.location.pathname
    winP.substr(0, winP.lastIndexOf("/single/") + 1);
  };



  const handleAvailability = (e) => {
    setStatus(e.target.value);
    console.log(status)
    axios
    .post(`${statusUrl}api/updatestatus/${item.listing_uid}`, { status })
    .then(r => console.log(r)).catch(err => console.log(err))
  }

  const shareListing = (str) => {
    let textArea = document.createElement('textarea');
    textArea.value = `http://localhost:3000/browse/single/${item.listing_uid}`;
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



  const saveListing = () => {
    axios
    .get(`${statusUrl}api/save/post/${item.listing_uid}/${dbUser.user_uid}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    window.location.reload();
  }



  const deleteListing = () => {
    axios
    .get(`${statusUrl}api/delete/${item.listing_uid}`)
    .then(r => console.log(r)).catch(e => console.log(e))
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
                <p className={`${item.status} soldStatus`} >{item.status}</p>
               {/* { dbUser.user_uid === item.seller_uid && (
                  <div className="availabilityDiv">
                  <p>Change availability?</p>
                  { item.status !== "Available" && (
                    <button className="availableBtn" value="Available" onClick={(e) => setStatus(e.target.value)}>Available</button>
                  )}

                  { item.status !== "Pending" && (
                    <button className="pendingBtn" value="Pending" onClick={(e) => setStatus(e.target.value)}>Pending</button>
                  )}

                  { item.status !== "Sold" && (
                    <button className="soldBtn" value="Sold" onClick={(e) => setStatus(e.target.value)}>Sold</button>
                  )}
                </div> 
                )} */}

                
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
                  { dbUser && !dbUser.saved_posts.includes(item.listing_uid) && item.seller_uid !== dbUser.user_uid && (
                    <div className="saveBtnParent">
                      <button className="saveBtn" onClick={() => saveListing()}>Save</button>
                    </div>
                  )}
                   <Link to={`/browse/single/${item.listing_uid}`} className="viewListing">View Listing</Link>
                    <textarea type="text" id='copyText' disabled value={`http://localhost:3000/browse/single/${item.listing_uid}`}/>
                    
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

            <hr />

            <div className="listingDescInfo">
              <p className="description">{item.description}</p>
              <p className="dateTime">
                Listed {item.date_created} {item.time_created}
              </p>
            </div>
          </div>
          {/* <input autofocus disabled value={`http://localhost:3000/browse/single/${item.listing_uid}`}/> */}
        <button className="closeBtn" onClick={(e) => handleClose(e)}>
          Close
        </button>
      </div>
    
  );
};

export default SingleModal;
