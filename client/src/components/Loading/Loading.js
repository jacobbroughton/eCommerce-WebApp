import React from "react";
import "./Loading.scss";

const Loading = ({ full, partial, singlePage }) => {
    
  return (
    // <div className="loadingMother">
    <>
      {full && (
        <div className="loadingMainFull">
          {/* <h1>...</h1> */}
        </div>
      )}
      {partial && <div className="loadingMainPartial"></div>}
      {singlePage && <div className="loadingSinglePage"></div>}
    </>

    // </div>
  );
};

export default Loading;
