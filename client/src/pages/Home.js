import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { CardPopular, CardNear } from "../components/Card";
import { restaurant, restaurantNear } from "../components/Data";
import Register from "../components/modal/Register";
import Login from "../components/modal/Login";

//image
import pizza from "../images/pizza.png";
import { UserContext } from "../context/userContext";
import { Crud } from "../components/core/CRUD/view";

function Home() {
  const [state] = useContext(UserContext);
  const history = useHistory();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const payload = {
    mode: "VIEW",
    url: "/partners",
    cache: "productReviewCache",
  };

  const reviewCustomerProduct = Crud(payload);
  const partners = reviewCustomerProduct?.data?.data?.data?.partners;

  console.log("product", reviewCustomerProduct?.data?.data?.data?.partners);

  const handleClose = (e, data) => {
    if (data === "login") {
      setShowLogin(false);
    }
    if (data === "register") {
      setShowRegister(false);
    }
  };
  console.log("state", state?.user?.role);
  const handleShow = (e, data, restaurant) => {
    const { id } = restaurant;
    if (state?.user?.role !== "CUSTOMER") {
      if (data === "login") {
        setShowLogin(true);
        setShowRegister(false);
      }
      if (data === "register") {
        setShowRegister(true);
        setShowLogin(false);
      }
    } else {
      history.push(`/product/${id}`);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container-fluid bg-warning p-5 pt-5 pb-5">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-5 mt-5">
              <div className="row">
                <div className="col">
                  <h1 className="font-weight-bold" style={{ fontFamily: "" }}>
                    Are You Hungry ?
                  </h1>
                  <h1>Express Home Delivery</h1>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-2 mt-2">
                  <div className="border border-2 border-bottom border-dark"></div>
                </div>
                <div className="col">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi asperiores cumque nihil nam illum fuga optio
                    perspiciatis, non quo nobis hic quidem laudantium
                    exercitationem molestiae quos commodi eius sit labore!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <img src={pizza} alt="Pizza" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="container-fuild p-3 pt-5 pb-5">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row">
                <div className="col">
                  <h2>Popular Restaurant</h2>
                </div>
              </div>
              <div className="row mt-4">
                {reviewCustomerProduct?.data?.data?.data?.partners?.map(
                  (partner) => (
                    <div
                      className="col-sm-3 mb-3"
                      onClick={(e) => handleShow(e, "login", partner)}
                    >
                      <CardPopular partner={partner} key={partner.id} />
                    </div>
                  )
                )}
              </div>
              <div className="container">
                <Login
                  setHandleShow={(e) => handleShow(e, "register")}
                  setShow={showLogin}
                  setHandleClose={(e) => handleClose(e, "login")}
                />
              </div>
              <div className="container">
                <Register
                  setHandleShow={(e) => handleShow(e, "login")}
                  setShow={showRegister}
                  setHandleClose={(e) => handleClose(e, "register")}
                />
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
