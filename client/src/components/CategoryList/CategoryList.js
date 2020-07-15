import React from "react";
import { Link } from "react-router-dom";
import "./CategoryList.scss"

const CategoryList = ({ handleCatClick }) => {

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
        "Fashion & Jewelry",
        "Home & Garden",
        "Toys & Games",
        "Arts & Crafts",
        "Books",
        "Beauty",
      ];

    return (
        <div className="catMother">
        <h3 className="catHead">Categories</h3>
        <ul className="catList">
          {categoryArr.map((cate) =>
            cate === "All" ? (
              <Link to={`/browse/category/all`} key={cate}>
                <li className="catItem" onClick={(e) => handleCatClick(e.target.value)}>
                  All For Sale
                </li>
              </Link>
            ) : (
              <Link
                to={`/browse/category/${cate.replace(/ /g, "-")}`}
                key={cate}
              >
                <li className="catItem" onClick={(e) => handleCatClick(e.target.value)}>
                  {cate}
                </li>
              </Link>
            )
          )}
        </ul>
      </div>
    )
}

export default CategoryList;