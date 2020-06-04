import React from "react";
import "./ProfileInfo.scss";

const ProfileInfo = ({ dbUser }) => {
    return (
        <div className="userParent">
        <span className="nameParent">        
          <h1>{dbUser.first_name ? dbUser.first_name : '---'} &nbsp;</h1>
          <h1>{dbUser.last_name ? dbUser.last_name : '---'}</h1>
          {
              !dbUser.first_name && !dbUser.last_name && (
              <h1>{dbUser.nickname}</h1>
              )
          }
        </span>
        <h4>@{dbUser.nickname ? dbUser.nickname : '---'}</h4>
        <span className="townStateParent">
          <h4>{dbUser.town ? dbUser.town  : '---'}</h4>
          <h4>{dbUser.town && dbUser.state && (<>,&nbsp;</>)}</h4>
          <h4>{dbUser.state ? dbUser.state : '---'}</h4>
        </span>
        <h4>Created: {dbUser.time_created ? dbUser.time_created : '---'}</h4>
      </div>
    )
}

export default ProfileInfo;