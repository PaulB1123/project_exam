import { Auth } from "aws-amplify";
import { useState, createContext, useEffect } from "react";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { adminGetAccessGroupResourceType } from "../API";

const UserContext = createContext({
  allUserData: "" as string,
  user: null as AuthUser | null,
  setUser: (arg: AuthUser) => {},
  login: (e: any) => {},
  logout: (e: any) => {},
  payloadData: undefined as any,
  admin: false,
  setAdmin: (e: boolean) => {},
  accessData: {} as adminGetAccessGroupResourceType,
  setAccessData: (e: any) => {},
});

export type AuthUser = {
  name: string;
  family_name: string;
  email: string;
  accessToken: string;
  idToken: string;
  jwtToken: string;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider = (props: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [allUserData, setAllUserData] = useState<string>("");
  const [payloadData, setPayloadData] = useState();
  const [admin, setAdmin] = useState(false);
  const [accessData, setAccessData] = useState<any>("");

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
      // setAdmin((old) => !old);
      // console.log(user);
    });
  }, []);

  // console.log(admin);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((allUserData) => {
      setAllUserData(() => allUserData.signInUserSession.idToken.jwtToken);
      console.count("set alluserdata");
      //   console.log(allUserData.signInUserSession.idToken.jwtToken);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        allUserData,
        user,
        setUser,
        login,
        logout,
        payloadData,
        admin,
        setAdmin,
        accessData,
        setAccessData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
