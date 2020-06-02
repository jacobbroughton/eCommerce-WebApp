import React, { useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { useStatusUrl } from "../../contexts/statusUrl-context";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import "./ProfileTopSect.scss";

const ProfileTopSect = () => {
  const { dbUser } = useAuth0();
  const { serverUrl } = useStatusUrl();
  const [toggled, setToggled] = useState(false);


  return (
    <div className="profileTopSectMother">
      {dbUser && (
        <>
          <ProfileInfo dbUser={dbUser}/>
          <ProfileEditModal toggled={toggled} handleToggled={() => setToggled(!toggled)}/>
        </>

      )}
    </div>
  );
};

export default ProfileTopSect;