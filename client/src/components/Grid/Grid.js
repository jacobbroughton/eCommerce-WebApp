import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductListItem from "../ProductList-Item/ProductList-Item";
import "./Grid.scss";

const Grid = ({ limited, handleModalView, listings, gridItemNum }) => {
  let [gridCount, setGridCount] = useState(gridItemNum);

  useEffect(() => {
    console.log(listings)
    !gridItemNum ? setGridCount(8) : setGridCount(gridItemNum)
  }, [gridItemNum]);

  return (
    <>
    {listings.length >= 1 ? (
          //  {!listings ? ( 
      <div className="gridMother">
        {listings.slice(0, gridCount).map((list) =>
          handleModalView ? (
            <div
              className="gridItem"
              id="gridItem"
              key={list.listing_uid}
              onClick={() => handleModalView(list)}
            >
              {
                limited ? <ProductListItem item={list} small={true} /> : <ProductListItem item={list} small={false}/>
              }
              
            </div>
          ) : (
            <Link
              to={`/browse/single/${list.listing_uid}`}
              className="gridItem"
              id=""
              key={list.listing_uid}
            >
              <ProductListItem item={list} small={false}/>
            </Link>
          )
        )}

    </div>      
    ) : (
   
        <div className="notAvailableMother">
          <h2 className="naHead">No listings available...</h2>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </>
  );
};

export default Grid;
