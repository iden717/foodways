import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";

import { CartContext } from "../../context/cartContent";

import MapModal from "../../components/modal/Map";
import { Crud } from "../../components/core/CRUD/view";

import map from "../../images/icon/map.png";
import deleteIcon from "../../images/icon/delete.png";
import emptyCart from "../../images/empty-cart.png";

const Cart = () => {
  const [showMap, setShowMap] = useState(false);
  const [state, dispatch] = useContext(CartContext);

  let formOrder = [];
  state.carts.map((data, key) => {
    formOrder[key] = data;
  });

  let subtotal = [];
  state.carts.map((cart, key) => {
    subtotal[key] = cart.price * cart.qty;
  });

  const sum = subtotal.reduce((a, b) => {
    return a + b;
  }, 0);

  const finalTotal = sum + 10000;

  const [form, setForm] = useState({ total: finalTotal, product: formOrder });
  const history = useHistory();
  const deleteCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: { id },
    });
  };

  const dicrementCart = (product, id) => {
    if (product?.qty < 2) {
      dispatch({
        type: "REMOVE_CART",
        payload: { id },
      });
    } else {
      dispatch({
        type: "DICREMENT_CART",
        payload: product,
      });
    }
  };

  const addCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const payloadOrder = {
    mode: "CREATE",
    url: "/transaction",
    type: "json",
    form,
  };

  console.log("form order", form);

  const orderProduct = Crud(payloadOrder);

  const onOrder = async (e) => {
    e.preventDefault();

    try {
      await orderProduct.mutate();
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShowMap(false);
  };
  const handleShow = () => {
    setShowMap(true);
  };
  return (
    <div>
      {state?.qty === 0 ? (
        <div className="container mt-5 p-5">
          <div className="d-flex justify-content-center">
            <div className="">
              <img src={emptyCart} />
              <p className=" text-center" style={{ color: "#B1B1B1" }}>
                Your cart is empty go to{" "}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/")}
                >
                  <strong>Home</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => onOrder(e)}>
          <div className="container mt-5 p-5">
            <p className="fs-5" style={{ color: "#613D2B" }}>
              Delivery Location
            </p>
            <div className="row mb-2">
              <div className="col-md-9 mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-white border-white"
                  name="location"
                  onChange={(e) => onChange(e)}
                  placeholder="Location"
                  style={{ border: "2px solid #D2D2D2" }}
                />
              </div>
              <div className="col">
                <button
                  type="button"
                  onClick={(e) => handleShow()}
                  className="btn btn-primary btn-lg"
                  style={{
                    boxShadow: "none",
                    width: "100%",
                    backgroundColor: "#433434",
                    borderColor: "#433434",
                  }}
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
                  setShow={showMap}
                  setHandleClose={handleClose}
                  setHandleShow
                />
              </div>
            </div>
            <p className="fs-4">Review Your Order</p>
            <div className="row">
              <div className="col-md-8">
                {state.carts.map((cart) => (
                  <div className="row">
                    <div className="mb-4 ms-2 col-11 border border-1 border-bottom border-dark"></div>
                    <div className="col-8">
                      <div className="mb-4">
                        <div className="row">
                          <div className="col-md-3 mb-3">
                            <img
                              src={cart.img}
                              style={{
                                width: "100px",
                                height: "106px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="col">
                            <p className="fs-5 fw-bold">{cart.title}</p>
                            <span
                              onClick={() => dicrementCart(cart, cart.id)}
                              className="fs-1 cursor-pointer fw-bold me-3"
                            >
                              -
                            </span>
                            <span
                              className="fs-4 fw-bold me-3 px-2 rounded-circle"
                              style={{ backgroundColor: "#F6E6DA" }}
                            >
                              {cart.qty}
                            </span>
                            <span
                              onClick={() => addCart(cart)}
                              className="fs-2 cursor-pointer fw-bold"
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <p className="fs-5 text-end text-danger">
                          {toRupiah(cart.price, { dot: ",", floatingPoint: 0 })}
                        </p>
                        <div
                          class="d-grid gap-2 d-md-flex justify-content-md-end"
                          style={{ paddingTop: "17px" }}
                        >
                          <button
                            class="btn btn-link"
                            type="button"
                            onClick={() => deleteCart(cart.id)}
                            style={{ boxShadow: "none" }}
                          >
                            <img src={deleteIcon} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mb-4 border border-1 border-bottom border-dark"></div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="mb-4 ms-2 border border-1 border-bottom border-dark"></div>
                  <div className="col">
                    <div className="mb-3">
                      <p className="fs-5">Subtotal</p>
                      <p className="fs-5">Qty</p>
                      <p className="fs-5">Ongkir</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <p className="fs-5 text-end text-danger">
                        {toRupiah(sum, { dot: ",", floatingPoint: 0 })}
                      </p>
                      <p className="fs-5 text-end">{state.qty}</p>
                      <p className="fs-5 text-end text-danger">Rp10,000</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 ms-2 border border-1 border-bottom border-dark"></div>
                  <div className="col">
                    <div className="mb-3">
                      <p className="fs-5 text-danger">Total</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <p className="fs-5 text-end text-danger">
                        {toRupiah(finalTotal, { dot: ",", floatingPoint: 0 })}
                      </p>
                    </div>
                    <button
                      className="btn btn-primary mt-4"
                      type="submit"
                      style={{
                        boxShadow: "none",
                        width: "100%",
                        backgroundColor: "#433434",
                        borderColor: "#433434",
                      }}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Cart;
