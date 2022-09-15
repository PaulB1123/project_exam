import "../Styles/global.css";
import "./Header.css";
import ProfilePicture from "../images/profile_picture.jpg";
import { useContext } from "react";
import UserContext from "../../Data/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="header_container_group">
        <div className="header_container">
          <h1>Dashboard</h1>

          {user ? (
            <div className="profile_container">
              <img src={ProfilePicture}></img>
              <div className="profile_name">
                {user?.name} {user?.family_name}
              </div>
            </div>
          ) : (
            <div className="profile_container">
              {/* <img src={ProfilePicture}></img> */}
              <div className="profile_name">User is not logged in</div>
            </div>
          )}
        </div>

        <div className="h2">Welcome to your dashboard, {user?.name}</div>
      </div>
    </>
  );
}
