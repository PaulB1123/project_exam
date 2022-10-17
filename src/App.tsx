import { Amplify } from "aws-amplify";
import "./App.css";
import "./Componets/Styles/global.css";
import LogIn from "./Pages/LogIn";
import Database from "./Pages/Database";
import Report from "./Report";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const {
  REACT_APP_IDENTITY_POOL_ID,
  REACT_APP_AWS_REGION,
  REACT_APP_USER_POOL_ID,
  REACT_APP_USER_WEB_CLIENT_ID,
  REACT_APP_REDIRECT_SIGN_IN,
  REACT_APP_REDIRECT_SIGN_OUT,
} = process.env;

const amplifyConf = {
  aws_appsync_graphqlEndpoint:
    "https://zjr6j5dwbvg4joqegn4v26ic7e.appsync-api.eu-west-1.amazonaws.com/graphql",

  aws_project_region: "eu-west-1",

  aws_appsync_region: REACT_APP_AWS_REGION,

  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",

  Auth: {
    identityPoolId: REACT_APP_IDENTITY_POOL_ID,
    region: REACT_APP_AWS_REGION,
    userPoolId: REACT_APP_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_USER_WEB_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: "authentication.auth.eu-west-1.amazoncognito.com",
      scope: ["openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: REACT_APP_REDIRECT_SIGN_IN,
      redirectSignOut: REACT_APP_REDIRECT_SIGN_OUT,
      responseType: "token",
    },
  },
};
Amplify.configure(amplifyConf);

function App() {
  // const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn path="Database"></LogIn>}></Route>
        <Route path="/Database" element={<Database />}></Route>
        <Route
          path="/Report/:client/:country/:databaseId"
          element={<Report />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
