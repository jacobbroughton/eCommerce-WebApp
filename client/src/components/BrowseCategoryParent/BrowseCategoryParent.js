import React, { useState } from "react";
import ProductList from "../BrowseProductList/BrowseProductList";
import "./BrowseCategoryParent";

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
  const linkFriendlyCatArr = [];

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categoryArr.map(cate => (
          <li onClick={e => setCat(cate)}>{cate}</li>
        ))}
      </ul>
      <ProductList category={cat} />
    </div>
  );
};

export default BrowseCategoryParent;
