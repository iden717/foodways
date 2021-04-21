import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Crud } from "../../components/core/CRUD/view";
import MapModal from "../../components/modal/Map";
import { UserContext } from "../../context/userContext";
import map from "../../images/icon/map.png";

const EditProfile = () => {
  const history = useHistory();
  const [state] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({
    fullname: state?.user?.fullname,
    image: state?.user?.image ? state?.user?.image : null,
    email: state?.user?.email,
    phone: state?.user?.phone,
    location: state?.user?.location,
  });

  const [address, setAddress] = useState();
  const handleClose = (e, data) => {
    setShowLogin(false);
  };
  const handleShow = (e, data) => {
    setShowLogin(true);
  };

  const myAddress = async (lat, long) => {
    try {
      await axios
        .get(
          `http://api.positionstack.com/v1/reverse?access_key=0d785d5cdc75df0dd9ddbaf642d5fead?query=${lat},${long}`
        )
        .then((response) => {
          setAddress(response.data.data[0].label);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    const fileForm = { ...form };
    fileForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(fileForm);
  };
  // if (update.isLoading) return <h1>Loading</h1>;
  const payload = {
    mode: "UPDATE",
    url: "/user",
    type: "form-data",
    form,
  };
  const crud = Crud(payload);

  const setUpdate = async (e) => {
    e.preventDefault();

    try {
      await crud.mutate();
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2> Edit Profile Partner </h2>
        <form onSubmit={(e) => setUpdate(e)}>
          <div className="row mt-5">
            <div className="col-md-8 mb-4">
              <input
                type="text"
                className="form-control input-app form-control-lg"
                name="fullname"
                onChange={(e) => onChange(e)}
                placeholder="Full Name"
              />
            </div>
            <div className="col mb-4">
              <input
                type="file"
                className="form-control input-app form-control-lg"
                name="image"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <input
                type="text"
                className="form-control input-app form-control-lg"
                name="email"
                onChange={(e) => onChange(e)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <input
                type="text"
                className="form-control input-app form-control-lg"
                name="phone"
                onChange={(e) => onChange(e)}
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-8 mb-4">
              <input
                type="text"
                className="form-control input-app form-control-lg"
                name="location"
                onChange={(e) => onChange(e)}
                placeholder="Location"
              />
            </div>
            <div className="col">
              <button
                onClick={(e) => handleShow(e, "login")}
                type="button"
                className="btn btn-app btn-lg"
              >
                Select On Map{" "}
                <img
                  className="ms-2 pb-1"
                  src={map}
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
            <div className="container">
              <MapModal
                setShow={showLogin}
                setHandleClose={handleClose}
                mapModal={address}
              />
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              class="btn btn-primary btn-lg mt-4"
              type="submit"
              style={{
                boxShadow: "none",
                width: "32%",
                backgroundColor: "#433434",
                borderColor: "#433434",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
