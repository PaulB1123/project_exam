import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContex/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";

import "../Componets/Navigation/Navigation.css";

import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

type LoginProps = {
  path?: string;
};

const LogIn = (props: LoginProps) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const login = (e: any) => {
    e.preventDefault();
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito,
      customState: props.path,
    });
  };
  const logout = (e: any) => {
    e.preventDefault();
    Auth.signOut();
  };
  console.log(props);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    // all events
    // https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
    Hub.listen(
      "auth",
      ({ payload: { event, data: payloadData, ...rem }, ...rest }) => {
        console.log("Auth listen", event, payloadData, rest, rem);
        switch (event) {
          case "signIn":
            console.log("Auth call sign in");
            break;
          case "cognitoHostedUI":
            console.log("Auth call sign in CognitoHosted");
            break;
          case "customOAuthState":
            //https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
            navigate(payloadData);
            break;

          default:
            // eslint-disable-next-line no-alert
            alert(`Auth Unknown event failure: ${event}`);
            console.log("Auth Unknown event failure: ", event);
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {user ? (
              <div>
                <p>
                  Hello {user.attributes.name} {user.attributes.family_name}
                </p>{" "}
                <button className="button" onClick={logout}>
                  logout
                </button>
              </div>
            ) : (
              <button className="button" onClick={login}>
                login using cognito
              </button>
            )}
          </div>
        </div>
      </div>
      <IntroPage></IntroPage>
    </div>
  );
};

export default LogIn;
