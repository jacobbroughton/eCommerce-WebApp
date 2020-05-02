import React from "react";
import "./Loading.scss";

const Loading = (props) => {

    console.log(props)

    const { full, partial } = props;

    console.log("Full: " + full)
    console.log("Partial: " + partial)

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