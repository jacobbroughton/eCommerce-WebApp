import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import axios from "axios";
import "./ProductList.scss";

const BrowseProductList = props => {
  const { statusUrl } = useAuth0();
  const { category } = props;
  const [listings, setListings] = useState([]);
  let [loadCounter, setLoadCounter] = useState(0);

  useEffect(() => {
    if (category === "") {
    axios
      .get(`${statusUrl}api/browse/all`)
      .then(response => setListings([...response.data]))
      .catch(err => console.log(err));
    } else {
        axios
        .get(`${statusUrl}api/browse/${category}`)
        .then(response => setListings([...response.data]))
        .catch(err => console.log(err));
    }

  }, [category]);

  // if(loadCounter != listings.length) {
  //   console.log("No");
  // } else {
  //   return <Loading/>;
  // }
  

  return (
    <div className="browsePMother">
      <div className="browsePMain">

  {category === "" ? <h3 className="browsePHead">Recent Listings</h3> : <h3 className="browsePHead">{category}</h3>}
        <div className="browsePListings">
          {listings.map(list => (
            <div key={list.listing_uid} className="listItem">
              <img onLoad={() => setLoadCounter(loadCounter++)} className="itemImage" src={statusUrl + list.image} alt="" />
              <div className="itemTextParent">
                  {list.title.length > 20 ? 
                  <p className="itemTitle">{list.title.slice(0, 20)}...</p>
                  :
                  <p className="itemTitle">{list.title}</p>
                  }
              </div>
              <p className="itemPrice">${list.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseProductList;
