import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import placeholderImg from "../../assets/download.jpg";
import "./ProductList-Item.scss";

const ProductListItem = ({ item, small }) => {
  let [placeHolder, setPlaceHolder] = useState(true);
  const { serverUrl } = useStatusUrl();

  
  setTimeout(() => {
    setPlaceHolder(false);
  }, 500)

  if (item === null || item === undefined) {
    return <span></span>;
  }


  return (
    small ?  

      // SMALL
      <div key={item.id} id="smallListItem" className="smallListItem">
      {item.image !== "null" && item.image !== null && !placeHolder ? (
        <img
          className="itemImage"
          src={`${serverUrl}/${item.image.split(" ")[0]}`}
          alt=""
          onError={(e) => console.log(e)}
        />
      ) : (
        <img
          className="itemImage"
          src={placeholderImg}
          alt=""
        />
      )}


      <div className="itemTextParent">
        {item.title.length > 20 ? (
          <p className="itemTitle">{item.title.slice(0, 20)}...</p>
        ) : (
          <p className="itemTitle">{item.title}</p>
        )}
        <p className="itemCityState">
          {item.city}, {item.state}
        </p>
        <p className="itemPrice">${item.price}</p>
      </div>

      
    </div>

    :


      <div key={item.id} id="listItem" className="listItem">
        {item.image !== "null" && item.image !== null && !placeHolder ? (
          <img
            className="itemImage"
            src={`${serverUrl}/${item.image.split(" ")[0]}`}
            alt=""
          />
        ) : (
          <img
            className="itemImage"
            src={placeholderImg}
            alt=""
          />
        )}


        <div className="itemTextParent">
          {item.title.length > 20 ? (
            <p className="itemTitle">{item.title.slice(0, 20)}...</p>
          ) : (
            <p className="itemTitle">{item.title}</p>
          )}
          <p className="itemCityState">
            {item.city}, {item.state}
          </p>
        </div>

        <p className="itemPrice">${item.price}</p>
      </div>



      
  );
};

export default ProductListItem;
