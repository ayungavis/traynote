import React, { useContext } from "react";
import { firebase } from "services/firebase";
import { User } from "types/model";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  isAuthReady: boolean;
  firebaseUser: firebase.User | null;
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isLoggedIn: false,
  isAuthReady: false, //True when firebase
  firebaseUser: null, //value is only available after isAuthReady == true
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const withAuthContext = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithAuthContext extends React.Component<P & AuthContextInterface> {
    render() {
      return (
        <AuthContext.Consumer>
          {(authContext) => {
            return <Component {...this.props} {...authContext} />;
          }}
        </AuthContext.Consumer>
      );
    }
  };

export default AuthContext;
