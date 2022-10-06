import React, { useContext } from "react";
import "./introPage.css";
import "../../Componets/Navigation/Navigation.css";
import DashboardImg from "./img/DashboardHero.png";

function IntroPage() {
  //   const context = useContext(UserContext);
  return (
    <div className="IntroPage_container">
      <div className="Img">
        <img src={DashboardImg} alt="" />
      </div>
      <h1>Meet our new dashboard</h1>
      <p>Where everthing is customizable</p>
    </div>
  );
}

export default IntroPage;
