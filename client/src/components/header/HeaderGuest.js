import { useState, useContext, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import logo from "../../images/icon/logo.png";
import logoFont from "../../images/icon/WaysFood.png";

import LoginModal from "../modal/Login";
import RegisterModal from "../modal/Register";

function HeaderGuest() {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = (e, data) => {
    if (data === "login") {
      setShowLogin(false);
    }
    if (data === "register") {
      setShowRegister(false);
    }
  };
  const handleShow = (e, data) => {
    if (data === "login") {
      setShowLogin(true);
      setShowRegister(false);
    }
    if (data === "register") {
      setShowRegister(true);
      setShowLogin(false);
    }
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
        <button
          className="navbar-toggler"
          type="button"
          style={{ boxShadow: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mt-2" id="itemNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <div className="row me-5">
              <div className="d-grid gap-2 col-6 mx-auto">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={(e) => handleShow(e, "register")}
                  style={{ boxShadow: "none" }}
                >
                  Register
                </Button>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={(e) => handleShow(e, "login")}
                  style={{ boxShadow: "none" }}
                >
                  Login
                </Button>
              </div>
              {/* Modal Login and register */}
              <div className="container">
                <LoginModal
                  setHandleShow={(e) => handleShow(e, "register")}
                  setShow={showLogin}
                  setHandleClose={(e) => handleClose(e, "login")}
                />
              </div>
              <div className="container">
                <RegisterModal
                  setHandleShow={(e) => handleShow(e, "login")}
                  setShow={showRegister}
                  setHandleClose={(e) => handleClose(e, "register")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderGuest;
