import React from "react";
import "./Loading.scss";

const Loading = ({ full, partial }) => {

    return (
        <div className="loadingMother">
            { full && (
                <div className="loadingMainFull">
                    <h1>Loading...</h1>
                </div>
            )}
            { partial && (
                <div className="loadingMainPartial">
                <h1>Loading...</h1>
            </div>
            )}

        </div>
    )
}

export default Loading;