import "../Styles/global.css"
import './Header.css';
import ProfilePicture from "../images/profile_picture.jpg"

export default function Header() {
    return ( 
    <>
     <div className="header_container_group">
     
     <div className="header_container">
     <h1>Dashboard</h1>
     <div className="profile_container">
        <img src={ProfilePicture}></img>
        <div  className="profile_name">Mihai Alin</div>
     </div>
     </div>


     <div className="h2">Welcome to your new dashboard, Mihai</div>
     </div>
    </>
    )
}
       
