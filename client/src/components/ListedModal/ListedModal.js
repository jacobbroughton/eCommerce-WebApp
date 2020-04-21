import React from "react";
import { Link } from "react-router-dom";
import "./ListedModal.scss";

const ListedModal = () => {
  return (
    <div className="listedModalMother">
      <h3 className="postedP">Your listing has been posted!</h3>
      <p className="browseP">
        <Link to="/browse">Return to Browse</Link>
      </p>
      <p className="profileP">
        <Link to="/profile">View listing on profile</Link>
      </p>
    </div>
  );
};

export default ListedModal;
