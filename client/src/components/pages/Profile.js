import React, {useEffect} from "react";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import ProfileTopSect from "../ProfileTopSect/ProfileTopSect";
import { useAuth0 } from "../../contexts/auth0-context";
import "./styles/Profile.scss";

const Profile = () => {
  const { dbUser, user, isLoading } = useAuth0();

  useEffect(() => {
    console.log("refreshing for dbUser")
  }, [dbUser])

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
      <div className="profileMain">
        <ProfileTopSect />
        <hr/>

        <button onClick={e => handleEditModal(e)}>Open Modal</button>
        <div style={style1} id="modalParent">
          <ProfileEditModal />
        </div>
      </div>
    </div>
  );
};

export default Profile;
