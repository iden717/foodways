import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";

//import components
import { Loading } from "./components/Loading";
import SwitchHeader from "./components/header/";
import {
  PrivateRoutePartner,
  PrivateRouteCustomer,
} from "./components/PrivateRoute";

//import context
import { CartContextProvider } from "./context/cartContent";
import { UserContext } from "./context/userContext";

//import pages customer
import Home from "./pages/Home";
import Detail from "./pages/customer/Detail";
import Profile from "./pages/customer/Profile";
import EditProfile from "./pages/customer/EditProfile";
import CartDetail from "./pages/customer/Cart";

//import pages partner
import HomePartner from "./pages/partner/Home";
import ProfilePartner from "./pages/partner/Profile";
import EditPartner from "./pages/partner/EditProfile";
import AddProduct from "./pages/partner/AddProduct";
import ProductPartner from "./pages/partner/Product";

//style
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/master.css";

//api
import { API, setAuthToken } from "./config/api";
import { Crud, View } from "./components/core/CRUD/view";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
// console.log("token", localStorage.token);
function App() {
  const [state, dispatch] = useContext(UserContext);
  const [role, setRole] = useState();

  const checkUser = async () => {
    try {
      const respone = await API.get("/check-auth");
      if (respone.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = respone.data.data.user;
      payload.token = localStorage.token;
      payload.role = respone.data.data.user.role;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      setRole(respone.data.data.user.role);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  if (state?.loading) return <Loading />;

  return (
    <CartContextProvider>
      <Router>
        <div>
          <SwitchHeader role={state?.user?.role} />
          <Switch>
            <SwitchComponent />
          </Switch>
        </div>
      </Router>
    </CartContextProvider>
  );
}

function SwitchComponent() {
  const [state] = useContext(UserContext);

  switch (state?.user?.role) {
    case "CUSTOMER":
      return (
        <div>
          <PrivateRouteCustomer exact path="/" component={Home} />
          <PrivateRouteCustomer exact path="/product/:id" component={Detail} />
          <PrivateRouteCustomer exact path="/profile" component={Profile} />
          <PrivateRouteCustomer
            exact
            path="/profile/edit"
            component={EditProfile}
          />
          <PrivateRouteCustomer exact path="/cart" component={CartDetail} />
        </div>
      );
    case "PARTNER":
      return (
        <div>
          <PrivateRoutePartner exact path="/" component={HomePartner} />
          <PrivateRoutePartner
            exact
            path="/product"
            component={ProductPartner}
          />
          <PrivateRoutePartner
            exact
            path="/profile"
            component={ProfilePartner}
          />
          <PrivateRoutePartner
            exact
            path="/profile/edit"
            component={EditPartner}
          />
          <PrivateRoutePartner
            exact
            path="/add-product"
            component={AddProduct}
          />
        </div>
      );
    default:
      return <Route exact path="/" component={Home} />;
  }
}

export default App;
