import React from "react";
import "./SingleModal.scss";

const SingleModal = (props) => {

    let {item} = props;

    const handleClose = (e) => {
        document.getElementById("modalMother").parentNode.style = "none";
    }

    return (
        <div id="modalMother" className="modalMother">
            { item && (
                <div>
                    {console.log(item)}
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                </div>
            )}
            <button onClick={(e) => handleClose(e)}>Close</button>
        </div>
    )
}

export default SingleModal;