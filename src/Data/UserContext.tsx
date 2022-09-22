import { Auth, Hub } from "aws-amplify";
import { useState, createContext, useEffect } from "react";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  allUserData: "" as string,
  user: null as AuthUser | null,
  setUser: (arg: AuthUser) => {},
  login: (e: any) => {},
  logout: (e: any) => {},
  payloadData: undefined as any,
});

export type AuthUser = {
  name: string;
  family_name: string;
  email: string;
  accessToken: string;
  idToken: string;
  jwtToken: string;
};
type UserContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};
type UserContextProviderProps = {
  children: React.ReactNode;
};
type LoginProps = {
  path?: string;
};

export const UserContextProvider = (props: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [allUserData, setAllUserData] = useState<string>("");
  const [payloadData, setPayloadData] = useState();

  const login = (e: any) => {
    e.preventDefault();
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito,
      customState: "Database",
    });
  };
  const logout = (e: any) => {
    e.preventDefault();
    Auth.signOut();
  };
  //   console.log(props);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user.attributes);
      //   console.log(user.attributes);
    });
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((allUserData) => {
      setAllUserData(() => allUserData.signInUserSession.idToken.jwtToken);
      console.count("set alluserdata");
      //   console.log(allUserData.signInUserSession.idToken.jwtToken);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ allUserData, user, setUser, login, logout, payloadData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
