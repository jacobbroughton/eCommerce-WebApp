import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import placeholderImg from "../../assets/download.jpg";
import moment from "moment";
import "./SinglePage.scss";

const SinglePage = () => {

    const { statusUrl, dbUser } = useAuth0();
    let imageArr = [];
    const [single, setSingle] = useState(null);
    const [image, setImage] = useState("");
    // const [status, setStatus] = useState(single.status);
    let listingUid = window.location.pathname.replace("/browse/single/", "");



    useEffect(() => {
        axios
        .get(`${statusUrl}api/browse/single/${listingUid}`)
        .then(res => setSingle(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleSave = () => {
        let time = moment().format("LT");
        let date = moment().format("L");
        let time_saved = time.replace(/\s/g, "");
        let date_saved = date.replace(/\//g, "-");
    
        axios
        .get(`${statusUrl}api/save/post/${single.listing_uid}/${dbUser.user_uid}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    
        window.location.reload();
      }

      if (single !== null) {
        imageArr = single.image.split(" ");
        for (let i = 0; i < imageArr.length; i++) {
          if (imageArr[i] === "") {
            imageArr.pop();
          }
        }
      }
    
    

    if(single === null) return <Loading/>
    else {
    return (
        <div id="singlePageMother" className={`singlePageMother`}>
        <div className="singlePageMain">
          <div className="imagesGenInfoDiv">
            <div className="imagesParent">
              {image === "" && single.image !== "null" ? (
                <img
                  className="singleImage"
                  src={statusUrl + imageArr[0]}
                  alt=""
                />
              ) : (
                single.image !== "null" &&
              (
                <img className="singleImage" src={image} alt="" />
              )              
              )} 
              {single.image === "null" && (
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
              <h1 className="title">{single.title}</h1>
              {/* <p className={`${single.status} soldStatus`} >{single.status}</p>
              <div className="availabilityDiv">
                <p>Change availability?</p>
                { single.status !== "Available" && (
                  <button className="availableBtn" value="Available" onClick={(e) => setStatus(e.target.value)}>Available</button>
                )}

                { single.status !== "Pending" && (
                  <button className="pendingBtn" value="Pending" onClick={(e) => setStatus(e.target.value)}>Pending</button>
                )}

                { single.status !== "Sold" && (
                  <button className="soldBtn" value="Sold" onClick={(e) => setStatus(e.target.value)}>Sold</button>
                )}
              </div> */}
              

              
              
              
              <div className="listingGenInfo">
                <div className="listingGenItem">
                  <p className="genInfoLabel">Price</p>
                  <p className="genInfoP">${single.price}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Condition</p>
                  <p className="genInfoP">{single.item_condition}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Shipping</p>
                  <p className="genInfoP">{single.ship_status}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Category</p>
                  <p className="genInfoP">{single.category}</p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Located In</p>
                  <p className="genInfoP">
                    {single.city}, {single.state}
                  </p>
                </div>
                <div className="listingGenItem">
                  <p className="genInfoLabel">Listed By</p>
                  <p className="genInfoP">{single.seller_nickname}</p>
                </div>
                { !dbUser.saved_posts.includes(single.listing_uid) && single.seller_uid !== dbUser.user_uid && (
                  <div className="saveBtnParent">
                    <button className="saveBtn" onClick={() => handleSave()}>Save</button>
                  </div>
                )}

              </div>
            </div>
          </div>

          <hr />

          <div className="listingDescInfo">
            <p className="description">{single.description}</p>
            <p className="dateTime">
              Listed {single.date_created} {single.time_created}
            </p>
          </div>
        </div>
      {/* <button className="closeBtn" onClick={(e) => handleClose(e)}>
        Close
      </button> */}
    </div>
    )
    }


}

export default SinglePage;