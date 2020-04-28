import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";
import SinglePage from "../SinglePage/SinglePage";
import "./CategoryParent.scss";

const BrowseCategoryParent = props => {
  const [cat, setCat] = useState("");
  const { single } = props;

  const categoryArr = [
    "All", 
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
                <li className="catItem" key={cate} onClick={e => setCat(cate)}>All For Sale</li>
                :
                <li className="catItem" key={cate} onClick={e => setCat(cate)}>{cate}</li>
                ))}
            </ul>
        </div>
      { !single && (
        <ProductList category={cat} />
      )}
      { single && (
        <SinglePage/>
      )}
      
    </div>
  );
};

export default BrowseCategoryParent;
