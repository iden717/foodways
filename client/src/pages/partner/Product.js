import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Crud } from "../../components/core/CRUD/view";
import Product from "../../components/card/productPartner";
import { UserContext } from "../../context/userContext";

import { Loading } from "../../components/Loading";
import ModalAddProduct from "../../components/modal/AddProduct";

const AddProduct = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [loadingDouble, setLoading] = useState(true);
  const [addProduct, setAddProduct] = useState(false);

  const payload = {
    mode: "VIEW",
    url: `/products/${state?.user?.id}`,
    cache: "productCache",
  };

  const response = Crud(payload);
  const responseProduct = response?.data?.data?.data?.products;

  const handleClose = () => {
    setAddProduct(false);
  };
  const handleShow = () => {
    setAddProduct(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  console.log("loading", response);
  if (response.isLoading) return <Loading />;
  return (
    <div>
      <div style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container-fuild p-3  pb-5">
          <div className="row mt-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="d-flex col-md-4 justify-content-start">
                <h1>Your Product</h1>
              </div>
              <div className="d-flex justify-content-end">
                <div className="col-md-2">
                  <button onClick={() => handleShow()} className="btn btn-app">
                    <strong>Add Product</strong>
                  </button>
                </div>
              </div>
              <div className="container">
                <ModalAddProduct
                  setShow={addProduct}
                  setHandleClose={handleClose}
                />
              </div>
              <div className="row mt-4">
                {responseProduct?.map((data, key) => (
                  <div className="col-sm-3 mb-4">
                    <Product index={key} product={data} key={data.id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
