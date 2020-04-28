import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import {Link} from "react-router-dom";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";
import placeholderImg from "../../assets/download.jpg";

const BrowseProductList = (props) => {
  const { statusUrl } = useAuth0();
  const { category } = props;
  const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [resultNum, setResultNum] = useState(20);
  let [loadCounter, setLoadCounter] = useState(0);
  let [toggle, setToggle] = useState(0);



  useEffect(() => {
    if (category === "") {
      axios
        .get(`${statusUrl}api/browse/all/${resultNum}`)
        .then((response) => setListings([...response.data]))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${statusUrl}api/browse/${category}/${resultNum}`)
        .then((response) => setListings([...response.data]))
        .catch((err) => console.log(err));
    }
  }, [category, statusUrl, resultNum]);



  const handleModalView = (props) => {
    setCurrentItem(props);
    setToggle(1);
    document.getElementById("toggleDiv").style.display = "block";
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    // window.history.pushState("", "", `/single/${selectedProduct.listing_url}`)
  }
  


  const overlayClose = e => {
    const overlay = document.getElementById("overlay");
    document.getElementById("toggleDiv").style.display = "none";
    overlay.classList.remove("active");
    // closeModal(e, modal, null);
  };



  const handleLoadMore = e => {
    setResultNum(resultNum + 20)
  }



  return (
    <div className="browsePMother">
      <div className="browsePMain">
        {category === "All" && <h3 className="browsePHead">All for Sale</h3>}
        {category === "" ? (
          <h3 className="browsePHead">Recent Listings</h3>
        ) : category !== "All" ? (
          <h3 className="browsePHead">{category}</h3>
        ) : (
          <> </>
        )}
        <div className="browsePListings">
          {listings.map((list) => (
            // <Link
            //   key={list.listing_uid}
            //   to={`/browse/single/${list.listing_uid}`}
            // >
              <div key={list.id} onClick={() => handleModalView(list)} className="listItem">
                { list.image !== "null" && list.image !== null ? 
                  <img
                    onLoad={() => setLoadCounter(loadCounter++)}
                    className="itemImage"
                    src={statusUrl + list.image.split(" ")[0]}
                    alt=""
                  />
                :
                <img
                onLoad={() => setLoadCounter(loadCounter++)}
                className="itemImage"
                src={placeholderImg}
                alt=""
              />
                }

                <div className="itemTextParent">
                  {list.title.length > 20 ? (
                    <p className="itemTitle">{list.title.slice(0, 20)}...</p>
                  ) : (
                    <p className="itemTitle">{list.title}</p>
                  )} 
                  <p className="itemCityState">{list.city}, {list.state}</p>
                </div>
                 
                <p className="itemPrice">${list.price}</p>          
                
  
              </div>
            // </Link>
          ))}
              <div id="toggleDiv" className="toggleDiv">
                { toggle === 1 && (
                  <SingleModal item={currentItem}/>
                )}
            
          </div>
          <div onClick={() => overlayClose()} className="" id="overlay"></div>
        </div>
        { listings.length > 0 && (
          <button className="loadMoreBtn" onClick={(e) => handleLoadMore(e)}>Load More</button>
        )}
        
      </div>
      
    </div>
  );
};

export default BrowseProductList;
