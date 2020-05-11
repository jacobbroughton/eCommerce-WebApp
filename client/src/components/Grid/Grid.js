import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductListItem from "../ProductList-Item/ProductList-Item";
import "./Grid.scss";

const Grid = ({ listings, gridItemNum }) => {

    let [gridCount, setGridCount] = useState(4);

    useEffect(() => {
    if(!gridItemNum) {
        setGridCount(8);
    }
    }, [gridItemNum])

  return (
    <div className="gridMother" >
      {listings.length >= 1 ?
        listings.slice(0, gridCount).map((list) => (
          <div 
            className="gridItem"
            id=""
            key={list.listing_uid}
            onClick={() => this.props.handleModalView(list)}
          >
            <ProductListItem item={list} />
          </div>
        ))
        :
        <div className="notAvailableMother">
            <h2 className="naHead">No listings available...</h2>
            <p className="naPara">Please try different search terms</p>
      </div>
        }
    </div>
  );
};

export default Grid;
