import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";
import "./CategoryParent.scss";

const BrowseCategoryParent = () => {
  const [cat, setCat] = useState("");
  const categoryArr = [
    "Video Games",
    "Computers & Accessories",
    "Outdoors & Sports",
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
                <li className="catItem" key={cate} onClick={e => setCat(cate)}>{cate}</li>
                ))}
            </ul>
        </div>

      <ProductList category={cat} />
    </div>
  );
};

export default BrowseCategoryParent;
