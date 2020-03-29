import React from "react";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import { useAuth0 } from "../../contexts/auth0-context";

const Profile = () => {
  const { dbUser, user, isLoading } = useAuth0();

  const handleEditModal = e => {
    let modalParent = document.getElementById("modalParent");
    let style = modalParent.style;
    style.display = "inline-block";
  };

  const style1 = {
    display: "none"
  };

  return (
    <div className="profileMother">
      {dbUser.first_name === "null" && (
        <h2 className="profileEmailHead">{dbUser.email}</h2>
      )}
      {dbUser.first_name !== "null" && (
        <>
          <h2>{dbUser.first_name}</h2>
          <h2>{dbUser.last_name}</h2>
        </>
      )}
      <button onClick={e => handleEditModal(e)}>Open Modal</button>
      <div style={style1} id="modalParent">
        <ProfileEditModal />
      </div>
    </div>
  );
};

export default Profile;
