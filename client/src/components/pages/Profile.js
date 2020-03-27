import React from "react";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

const Profile = () => {

    const handleEditModal = e => {
        let modalParent = document.getElementById("modalParent")
        let style = modalParent.style;
        style.display = "inline-block";
    }

    const style1 = {
        display: "none"
    }

    return (
        <div>
            <p>Profile</p>
            <button onClick={(e) => handleEditModal(e)}>Open Modal</button>
            <div style={style1} id="modalParent">
                <ProfileEditModal/>
            </div>
        </div>
    )
}

export default Profile;