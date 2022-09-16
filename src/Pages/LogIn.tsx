import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";
import IntroPage from "../Componets/IntroPage/IntroPage";
import Annalect from "../Componets/Navigation/icons/Annalect.png";
import "../Componets/Navigation/Navigation.css";
import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import UserContext from "../Data/UserContext";

type LoginProps = {
  path?: string;
};

/* export const AuthentificatedUserContext = React.createContext({
  userData: [] as any[],
}); */

const LogIn = (props: LoginProps) => {
  const { user, setUser, login, logout, payloadData } = useContext(UserContext);
  // const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // const userContext = useContext(UserContext);

  /*  const login = (e: any) => {
    e.preventDefault();
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito,
      customState: props.path,
    });
  }; */
  /*   const logout = (e: any) => {
    e.preventDefault();
    Auth.signOut();
  }; */

  /*   useEffect(() => {
    Auth.currentAuthenticatedUser().then((user: any) => {
      setUser(user);
      console.log(user.attributes);
    });
  }, []); */

  // console.log(userContext);

  // console.log(userContext?.user?.name);

  useEffect(() => {
    // all events
    // https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
    Hub.listen("auth", (payload: any) => {
      console.log("Auth listen", payload);
      const event = payload.payload.event;
      const payloadData = payload.payload.data;
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
          // alert(`Auth Unknown event failure: ${event}`);
          console.log("Auth Unknown event failure: ", event);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(user);
  /*   useEffect(() => {
    if (payloadData !== undefined) {
      navigate(payloadData);
    }
  }, [payloadData]); */

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
            {user ? (
              <div>
                <h1>
                  Welcome to your dashboard, {user.name} {user.family_name}
                </h1>
                <p className="p_details_logIn">
                  You are already logged in, if you would like to access your
                  dashboard, select contiune
                </p>
              </div>
            ) : (
              <div>
                <h1 className="h1_for_log_in">Welcome, </h1>
                <p>
                  If you would like to access your dashboards you will have to
                  log in
                </p>
              </div>
            )}
          </div>
        </div>
        {/* <div>{context}</div> */}
        <div className="login_contianer_box_container">
          <div className="login_contianer_box">
            <h1 className="LoginH1">Log in into your account</h1>
            {/* <AuthentificatedUserContext.Provider value={user}>
              {" "}
              <Link to="/Database">
                <button className="button">Contiune</button>
              </Link>
            </AuthentificatedUserContext.Provider> */}
            <Link to="/Database">
              <button className="button">Contiune</button>
            </Link>
            {user ? (
              <div>
                <button className="button" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="button" onClick={login}>
                Login
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
