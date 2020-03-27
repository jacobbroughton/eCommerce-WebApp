import React from "react";
import "./ProfileEditModal.scss";

const ProfileEditModal = () => {

    const handleModalClose = () => {
        let modal = document.getElementById("editModalMother").parentNode;
        modal.style.display = "none";
    }

    return (
        <div id="editModalMother">
            <h1>Profile Edit Modal</h1>
            <button onClick={() => {handleModalClose()}}>X</button>
        </div>
    )
}

export default ProfileEditModal;