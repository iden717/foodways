import { useContext } from "react";
import { UserContext } from "../context/userContext";
import date from "date-and-time";

import toRupiah from "@develoka/angka-rupiah-js";
//import logo
import logo from "../images/icon/logo.png";
import fontLogo from "../images/icon/WaysFood.png";

import avatar from "../images/avatar.jpg";
import defaultImg from "../images/default.jpg";

export function CardPopular({ partner }) {
  const { id, image, fullname } = partner;
  const [state] = useContext(UserContext);
  console.log("image", image);
  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <img
              src={image ? image : avatar}
              alt={fullname}
              className="rounded-circle mb-1"
              style={{ objectFit: "cover", width: "50px", height: "50px" }}
            />
            <span className="fs-5 fw-bold ms-3">{fullname}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardNear({ products, orderButton, addCart }) {
  const { id, image, distance, title, price } = products;

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <img
              src={image ? image : defaultImg}
              className="mb-2"
              style={{ objectFit: "cover", width: "100%", height: "150px" }}
            />
            <div className="mb-2">
              <p className="fs-6 fw-bold">{title}</p>
              {orderButton && (
                <small className="fs-12 text-danger">
                  {toRupiah(price, { dot: ",", floatingPoint: 0 })}
                </small>
              )}
              {!orderButton && <small className="fs-12">{distance}</small>}
            </div>
            {orderButton && (
              <button
                onClick={() => addCart(products)}
                className="btn btn-primary text-dark fw-bold"
                style={{
                  boxShadow: "none",
                  width: "100%",
                  backgroundColor: "#FFC700",
                  borderColor: "#FFC700",
                }}
              >
                Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardHistory({ products }) {
  const { id, imgFont, imgLogo, title, createdAt, status, total } = products;
  const now = new Date(createdAt);
  const day = date.format(now, "dddd,");
  const dateMonth = date.format(now, "DD MMM YYYY");

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <span className="fs-5 fw-bold ms-3">{title}</span>
            <br />
            <span className="fs-6 fw-bold ms-3">{day} </span>
            <span className="fs-6 ms-1">{dateMonth}</span>
            <br />
            <div className="mt-3 fs-6  text-danger fw-bold mb-3">
              <span className="ms-3">Total :</span>
              <span className="ms-1">
                {toRupiah(total, { dot: ",", floatingPoint: 0 })}
              </span>
            </div>
          </div>
          <div className="col">
            <img
              className="ms-3 me-1 mt-1"
              src={fontLogo}
              style={{ width: "125px", height: "35px" }}
            />
            <img src={logo} style={{ width: "50px" }} />
            <div className="row mt-4 ms-3 me-3">
              <button className="btn btn-success btn-sm disabled">
                {status}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
