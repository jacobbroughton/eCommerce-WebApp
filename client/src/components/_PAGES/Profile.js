import React, {useEffect, useState} from "react";
import ProfileTopSect from "../ProfileTopSect/ProfileTopSect";
import ProfileListings from "../ProfileListings/ProfileListings";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import Loading from "../Loading/Loading";
import { useAuth0 } from "../../contexts/auth0-context";
import "./styles/Profile.scss";

const Profile = () => {
  const { dbUser, isLoading } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [loading, dbUser])


  if (isLoading || loading) {
    return <Loading full />;
  }

  return (
    <div className="profileMother">
      <div className="profileMain">
        <ProfileTopSect />
        <ProfileListings/>
      </div>
    </div>
  );
};

export default Profile;
