import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductListItem from "../ProductList-Item/ProductList-Item";
import "./Grid.scss";

const Grid = ({ limited, handleModalView, listings, gridItemNum }) => {
  let [gridCount, setGridCount] = useState(gridItemNum);

  useEffect(() => {
    !gridItemNum ? setGridCount(8) : setGridCount(gridItemNum)
  }, [gridItemNum]);

  return (
    <div className="gridMother">
      {listings.length >= 1 ? (
        listings.slice(0, gridCount).map((list) =>
          handleModalView ? (
            <div
              className="gridItem"
              id=""
              key={list.listing_uid}
              onClick={() => handleModalView(list)}
            >
              <ProductListItem item={list} />
            </div>
          ) : (
            <Link
              to={`/browse/single/${list.listing_uid}`}
              className="gridItem"
              id=""
              key={list.listing_uid}
            >
              <ProductListItem item={list} />
            </Link>
          )
        )
      ) : (
        limited ? 
        <></>
        :
        <div className="notAvailableMother">
          <h2 className="naHead">No listings available...</h2>
          <p className="naPara">Please try different search terms</p>
        </div>
      )}
    </div>
  );
};

export default Grid;
