import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";
import SinglePage from "../SinglePage/SinglePage";
import "./CategoryParent.scss";

const BrowseCategoryParent = props => {
  const [cat, setCat] = useState("");
  const { category, categoryItems, single } = props;

  const categoryArr = [
    "All For Sale", 
    "Video Games",
    "Computers & Accessories",
    "Outdoors & Sports",
    "Automotive Parts", 
    "Tools & Hardware",
    "Cameras & Equipment",
    "Musical Instruments",
    "Office Supplies",
    "Cell Phones",
    "Fashion",
    "Home & Garden",
    "Toys & Games",
    "Books",
    "Beauty"
  ];

  return (
    <div className="browseViewMother">
        <div className="catParent">
            <h3 className="catHead">Categories</h3>
            <ul className="catList">
                {categoryArr.map(cate => (
                cate === "All" 
                ? 
                <Link  to={`/browse/category/all`} key={cate}>
                  <li className="catItem"  onClick={e => setCat(cate)}>All For Sale</li>
                </Link>
                
                :
                <Link to={`/browse/category/${cate.replace(/ /g, "-")}`} key={cate}>
                  <li className="catItem"  onClick={e => setCat(cate)}>{cate}</li>
                </Link>
                
                ))}
            </ul>
        </div>
      {/* { category && (
        
        <ProductList/> // Work on it starting from here
      )} */}
      { !single && (
        <ProductList category={category} incomingListings={categoryItems} />
      )}
      { single && (
        <SinglePage/>
      )}
      
    </div>
  );
};

export default BrowseCategoryParent;
