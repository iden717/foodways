import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { Crud } from "../core/CRUD/view";

function Register(props) {
  const [form, setForm] = useState();

  const payload = {
    mode: "CREATE",
    url: "/register",
    type: "json",
    form,
  };

  const register = Crud(payload);

  const setRegister = async (e) => {
    e.preventDefault();

    try {
      await register.mutate(true);
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
          <form onSubmit={(e) => setRegister(e)}>
            <div className="container mt-4">
              <h2 style={{ color: "#FFC700" }}>
                <strong>Register</strong>
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
              <div className="mb-3">
                <input
                  type="text"
                  onChange={(e) => onChange(e)}
                  className="form-control input-app form-control-lg"
                  name="fullname"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select input-app form-select-lg"
                  onChange={(e) => onChange(e)}
                  name="gender"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={(e) => onChange(e)}
                  className="form-control input-app form-control-lg"
                  name="phone"
                  placeholder="Phone"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select input-app form-select-lg"
                  onChange={(e) => onChange(e)}
                  name="role"
                >
                  <option value="">Partner Or Customer</option>
                  <option value="CUSTOMER">As Customer</option>
                  <option value="PARTNER">As Partner</option>
                </select>
              </div>
              <button type="submit" className="btn btn-app btn-lg mt-3">
                Register
              </button>
              <p className="mt-2 text-center" style={{ color: "#B1B1B1" }}>
                Already have an account ? click{" "}
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

export default Register;
