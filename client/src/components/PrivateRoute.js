import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const PrivateRouteCustomer = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state?.user?.role === "CUSTOMER" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export const PrivateRoutePartner = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state?.user?.role === "PARTNER" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
