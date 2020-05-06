import React, { useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import placeholderImg from "../../assets/download.jpg";
import "./ProductList-Item.scss";

const ProductListItem = (props) => {
  const [currentItem, setCurrentItem] = useState(null);
  let [loadCounter, setLoadCounter] = useState(0);
  const [toggle, setToggle] = useState(0);
  let { item, toggled } = props;
  const { statusUrl } = useAuth0();

  if (item === null || item === undefined) {
    return <Loading />;
  }

  return (
    <>
      <div key={item.id} className="listItem">
        {item.image !== "null" && item.image !== null ? (
          <img
            onLoad={() => setLoadCounter(loadCounter++)}
            className="itemImage"
            src={statusUrl + item.image.split(" ")[0]}
            alt=""
          />
        ) : (
          <img
            onLoad={() => setLoadCounter(loadCounter++)}
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
    </>
  );
};

export default ProductListItem;
