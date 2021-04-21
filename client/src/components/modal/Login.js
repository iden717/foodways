import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { Crud } from "../core/CRUD/view";

function Login(props) {
  const [form, setForm] = useState();
  const history = useHistory();
  const payload = {
    mode: "CREATE",
    url: "/login",
    type: "json",
    form,
  };

  const login = Crud(payload);

  const setLogin = async (e) => {
    e.preventDefault();

    try {
      await login.mutate(true);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Modal
        dialogClassName="modal-wd"
        show={props.setShow}
        onHide={props.setHandleClose}
        centered
      >
        <Modal.Body>
          <form
            onSubmit={(e) => {
              setLogin(e);
            }}
          >
            <div className="container mt-4">
              <h2 style={{ color: "#FFC700" }}>
                <strong>Login</strong>
              </h2>
              <div className="mb-3 mt-4">
                <input
                  type="email"
                  onChange={(e) => onChange(e)}
                  className="form-control input-app form-control-lg"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={(e) => onChange(e)}
                  className="form-control input-app form-control-lg"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-app btn-lg mt-3">
                Login
              </button>
              <p className="mt-2 text-center" style={{ color: "#B1B1B1" }}>
                Don't have an account ? click{" "}
                <a style={{ cursor: "pointer" }} onClick={props.setHandleShow}>
                  <strong>Here</strong>
                </a>
              </p>

              {/* <pre>{JSON.stringify(form, 2, null)}</pre> */}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
