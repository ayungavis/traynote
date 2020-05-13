import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

import { useAuthContext } from "hooks/contexts/AuthContext";

interface PrivateRouteInterface extends RouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteInterface> = (props) => {
  const { component: Component, ...rest } = props;
  const { isAuthReady, isLoggedIn } = useAuthContext();

  if (!isAuthReady || isLoggedIn) {
    return (
      <Route
        {...rest}
        render={(routedProps) => <Component {...routedProps} {...rest} />}
      />
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRoute;
