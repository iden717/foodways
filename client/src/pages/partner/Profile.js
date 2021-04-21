import avatar from "../../images/avatar.jpg";

import { CardHistory } from "../../components/Card";
import { history } from "../../components/Data";
import { useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { View, Crud } from "../../components/core/CRUD/view";
import { Loading } from "../../components/Loading";

const Profile = () => {
  const [state] = useContext(UserContext);
  const historyU = useHistory();
  console.log("state", state.user.image);
  if (state?.loading) return <Loading />;
  return (
    <div>
      <div className="container p-3 pb-5">
        <div className="row mt-5 p-5">
          <div className="col-md-7 mb-5">
            <div className="row">
              <h2>My Profile</h2>
            </div>
            <div className="row mt-4">
              <div className="col-md-5 mb-4">
                <img
                  src={
                    state?.user?.image === null ? avatar : state?.user?.image
                  }
                  alt=""
                  className="mb-1"
                  style={{
                    borderRadius: "6px",
                    objectFit: "cover",
                    width: "100%",
                    height: "330px",
                  }}
                />
                <button
                  onClick={() => {
                    historyU.push(`/profile/edit`);
                  }}
                  className="btn btn-primary mt-4  btn-lg fw-bold"
                  style={{
                    boxShadow: "none",
                    width: "100%",
                    backgroundColor: "#433434",
                    borderColor: "#433434",
                  }}
                >
                  Edit Profile
                </button>
              </div>
              <div className="col">
                <div className="row mb-5">
                  <span
                    className="fs-5"
                    style={{
                      color: "#613D2B",
                      fontWeight: "800",
                      fontSize: "18px",
                      lineHeight: "25px",
                    }}
                  >
                    {" "}
                    Full Partner{" "}
                  </span>
                  <br />
                  <span className="fs-5"> {state?.user?.fullname} </span>
                </div>
                <div className="row mb-5">
                  <span
                    className="fs-5"
                    style={{
                      color: "#613D2B",
                      fontWeight: "800",
                      fontSize: "18px",
                      lineHeight: "25px",
                    }}
                  >
                    {" "}
                    Email{" "}
                  </span>
                  <br />
                  <span className="fs-5"> {state?.user?.email} </span>
                </div>
                <div className="row">
                  <span
                    className="fs-5"
                    style={{
                      color: "#613D2B",
                      fontWeight: "800",
                      fontSize: "18px",
                      lineHeight: "25px",
                    }}
                  >
                    {" "}
                    Phone{" "}
                  </span>
                  <br />
                  <span className="fs-5"> {state?.user?.phone} </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row">
              <h2>History Order</h2>
            </div>
            <div className="row mt-4">
              {history.map((data) => (
                <div className="mb-3">
                  <CardHistory products={data} orderButton={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
