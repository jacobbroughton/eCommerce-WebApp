import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.scss";
import SingleModal from "../SingleModal/SingleModal";

const BrowseProductList = (props) => {
  const { statusUrl } = useAuth0();
  const { category } = props;
  const [listings, setListings] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageArr, setImageArr] = useState([]);
  let [loadCounter, setLoadCounter] = useState(0);

  useEffect(() => {
    handleDataFetch();
    // handleImageSplitting()
  }, [category]);

  const handleDataFetch = () => {
    if (category === "") {
      axios
        .get(`${statusUrl}api/browse/all`)
        .then((response) => setListings([...response.data].reverse()))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${statusUrl}api/browse/${category}`)
        .then((response) => setListings([...response.data].reverse()))
        .catch((err) => console.log(err));
    }
  };

  const handleModalView = (props) => {
    setCurrentItem(props);
    document.getElementById("toggleDiv").style.display = "block";
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
              <div onClick={() => handleModalView(list)} className="listItem">
                { list.image && (
                  <img
                    onLoad={() => setLoadCounter(loadCounter++)}
                    className="itemImage"
                    src={statusUrl + list.image.split(" ")[0]}
                    alt=""
                  />
                )}

                <div className="itemTextParent">
                  {list.title.length > 20 ? (
                    <p className="itemTitle">{list.title.slice(0, 20)}...</p>
                  ) : (
                    <p className="itemTitle">{list.title}</p>
                  )}
                </div>
                <p className="itemPrice">${list.price}</p>          
                
  
              </div>
            // </Link>
          ))}
              <div id="toggleDiv" className="toggleDiv">
            <SingleModal item={currentItem}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProductList;
