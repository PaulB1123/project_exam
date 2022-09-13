import React, { useContext } from "react";
import { UserContext } from "../UserContex/UserContext";
import { Link } from "react-router-dom";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";

import "../Componets/Navigation/Navigation.css";

type LoginProps = {
  client?: string;
  country?: string;
  databaseId?: string;
};

const LogIn = (props: LoginProps) => {
  // const login = (e: any) => {
  //     e.preventDefault();
  //     Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Cognito, customState: "xsxh" });

  //   };
  //   const logout = (e: any) => {
  //     e.preventDefault();
  //     Auth.signOut();
  //   };
  console.log(props);

  //   const context = useContext(UserContext);
  return (
    <div className="login_container">
      <div className="login_left_contianer">
        <div className="logo">
          <div className="hero_logo">
            <img
              src={Annalect}
              alt="Main Menu logo "
              className="hero_logo_container"
            ></img>
          </div>
        </div>
        <div className="welcome_contianer">
          <div className="text_container">
            <h1>Welcome to your dashboard</h1>
            <p>Before everthing else, lets help you open your dashboards </p>
          </div>
        </div>
        {/* <div>{context}</div> */}
        <div className="login_contianer_box_container">
          <div className="login_contianer_box">
            <h1 className="LoginH1">Log in to your account</h1>
            <Link to="/Database">
              <button className="button">Contiune</button>
            </Link>
          </div>
        </div>
      </div>
      <IntroPage></IntroPage>
    </div>
  );
};

export default LogIn;
