import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import {Link} from "react-router-dom";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";
import ProductListItem from "../ProductList-Item/ProductList-Item";
import placeholderImg from "../../assets/download.jpg";

const BrowseProductList = (props) => {
  const { statusUrl } = useAuth0();
  const { category, incomingListings } = props;
  const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [resultNum, setResultNum] = useState(20);
  // let [loadCounter, setLoadCounter] = useState(0);
  let [toggled, setToggled] = useState(false);
  const [limit, setLimit] = useState(0);
  // let toggleDiv = document.getElementById("toggleDiv");



useEffect(() => {
  let newCategory = category.replace(/ /g, "-");
  setListings([...incomingListings])
  if (category === "All For Sale") {
    axios
    .get(`${statusUrl}api/browsecount/all`)
    .then(res => setLimit(res.data.COUNT))
    .catch(err => console.log(err))
  } else {
    axios
    .get(`${statusUrl}api/browsecount/${newCategory}`)
    .then(res => setLimit(res.data.COUNT))
    .catch(err => console.log(err))
  }
  window.scroll(0,0);
  
}, [category, incomingListings])



// Runs each time load more is clicked
useEffect(() => {
  let newCategory = category.replace(/ /g, "-");
  if (category === "All For Sale") {
    axios
    .get(`${statusUrl}api/browse/all/${resultNum}`)
    .then((response) => setListings([...response.data]))
    .catch((err) => console.log(err));
  } else {
  axios
    .get(`${statusUrl}api/browse/${newCategory}/${resultNum}`)
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
  }
}, [resultNum])



const handleModalView = (props) => {
  console.log("Handling modal view")
  console.log(props)
  setCurrentItem(props);
  setToggled(true);
  // let toggleDiv = document.getElementById("toggleDiv");
  // console.log(toggleDiv);
  // toggleDiv.style.display = "block"; // Add to CSS instead
  // toggleDiv.classList.add("active");
  const overlay = document.getElementById("overlay");
  // const modalMother = document.getElementById("modalMother");
  // modalMother.classList.add("active");
  overlay.classList.add("active");
}
  
const handleToggle = () => {
  toggled ? setToggled(false) : setToggled(true);
}



  const overlayClose = e => {
    const overlay = document.getElementById("overlay");
    // document.getElementById("modalMother").style.display = "none";
    setToggled(false);
    overlay.classList.remove("active");
    // closeModal(e, modal, null);
  };



  const handleLoadMore = e => {
    setResultNum(resultNum + 20)
  }



  return (
    <div className="browsePMother">
      <div className="browsePMain">
      {/* <input className="searchInput" placeholder="Search"/> */}
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
            // console.log(list),

              // <div key={list.id} onClick={() => handleModalView(list)} className="listItem">
              //   { list.image !== "null" && list.image !== null ? 
              //     <img
              //       onLoad={() => setLoadCounter(loadCounter++)}
              //       className="itemImage"
              //       src={statusUrl + list.image.split(" ")[0]}
              //       alt=""
              //     />
              //   :
              //   <img
              //   onLoad={() => setLoadCounter(loadCounter++)}
              //   className="itemImage"
              //   src={placeholderImg}
              //   alt=""
              // />
              //   }

              //   <div className="itemTextParent">
              //     {list.title.length > 20 ? (
              //       <p className="itemTitle">{list.title.slice(0, 20)}...</p>
              //     ) : (
              //       <p className="itemTitle">{list.title}</p>
              //     )} 
              //     <p className="itemCityState">{list.city}, {list.state}</p>
              //   </div>
                 
              //   <p className="itemPrice">${list.price}</p>          
      
              // </div>
              <div id="" key={list.listing_uid} onClick={() => handleModalView(list)}>
                <ProductListItem item={list} />
              </div>
              
          ))}


           {/* <div id="toggleDiv" className="toggleDiv"></div>   
           {console.log(toggle)}              */}
          { toggled && (
                  <SingleModal handleToggle={handleToggle} toggled={toggled} item={currentItem}/>
            )}
          <div onClick={() => overlayClose()} className="" id="overlay"></div>
        </div>
        { listings.length !== limit && (
          <button className="loadMoreBtn" onClick={(e) => handleLoadMore(e)}>Load More</button>
        )}
        
      </div>
      
    </div>
  );
};

export default BrowseProductList;
