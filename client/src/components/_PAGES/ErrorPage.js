import React from "react";
import "./styles/ErrorPage.scss";

const ErrorPage = () => {
    return (
        <div className="errorPageMother">
            <div className="errorPageChild">
                <h1>404 Error</h1>
                <p>Destination not found, please try another route.</p>
            </div>

        </div>
    )
}

export default ErrorPage