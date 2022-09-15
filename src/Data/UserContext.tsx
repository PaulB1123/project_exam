import { Auth, Hub } from "aws-amplify";
import { useState, createContext, useEffect } from "react";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
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
  console.log(props);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user: any) => {
      setUser(user.attributes);
      console.log(user.attributes);
      console.log(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, payloadData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
