import { useState, useContext, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import CartEmptyModal from "../../components/modal/CartEmpty";

import cartImg from "../../images/icon/Vector.png";
import profileImg from "../../images/Profil.png";
import logo from "../../images/icon/logo.png";
import logoFont from "../../images/icon/WaysFood.png";
import profileIcon from "../../images/icon/user.png";
import logoutIcon from "../../images/icon/logout.png";
import addFood from "../../images/icon/food.png";

import avatar from "../../images/avatar.jpg";
import { UserContext } from "../../context/userContext";

function HeaderPartner() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
  };
  const handleShow = () => {
    setShowLogin(true);
  };
  const setLogin = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container-fluid">
        <a className="navbar-brand ms-5">
          <div onClick={() => history.push(`/`)}>
            <img className="me-1 mt-1" src={logoFont} />
            <img src={logo} />
          </div>
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="itemNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="row">
            <div className="col-1">
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    boxShadow: "rgb(255 255 255 / 0%) 0px 0px 0px 0.25rem",
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                  id="profile"
                >
                  <img
                    className="rounded-circle"
                    src={state.user.image ? state.user.image : avatar}
                    alt="title"
                    style={{ width: "60px", height: "60px" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    <span className="fs-6">
                      <img
                        className="me-3"
                        src={profileIcon}
                        alt="title"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <strong>Profile Partner</strong>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/product">
                    <span className="fs-6">
                      <img
                        className="me-3"
                        src={addFood}
                        alt="title"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <strong>Product</strong>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/add-product">
                    <span className="fs-6">
                      <img
                        className="me-3"
                        src={addFood}
                        alt="title"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <strong>Add Product</strong>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setLogin()} href="/">
                    <span className="fs-6">
                      <img
                        className="ms-1 me-2"
                        src={logoutIcon}
                        alt="title"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <strong>Logout</strong>
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="container">
              <CartEmptyModal
                setShow={showLogin}
                setHandleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default HeaderPartner;
