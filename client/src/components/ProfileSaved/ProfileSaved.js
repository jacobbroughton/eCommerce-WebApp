import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth0} from "../../contexts/auth0-context";
import "./ProfileSaved.scss";

const ProfileSaved = () => {

    const [listings, setListings] = useState([]);
    const {statusUrl, dbUser} = useAuth0();

    useEffect(() => {
        axios
        .get(`${statusUrl}api/save/get/${dbUser.user_uid}`)
        .then(response => setListings([...response.data].reverse()))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="savedMother">
            <h2>Saved Listings</h2>
            {console.log(listings)}
        </div>
    )
}

export default ProfileSaved;