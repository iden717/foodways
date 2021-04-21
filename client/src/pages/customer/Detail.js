import { useState, useContext } from "react";
import { useParams } from "react-router";

import { CartContext } from "../../context/cartContent";

import { CardNear } from "../../components/Card";

import { useQuery } from "react-query";
import { API } from "../../config/api";

function Detail() {
  const [state, dispatch] = useContext(CartContext);
  const params = useParams();
  const { id } = params;

  const addCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const { data: ProductData, loading, error, refetch } = useQuery(
    "productCache",
    async () => {
      const response = await API.get(`/products/${id}`);
      return response.data.data.products;
    }
  );

  return (
    <div>
      <div style={{ backgroundColor: "#f5f7fa" }}>
        <div className="container-fuild p-3  pb-5">
          <div className="row mt-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row mt-4 p-5  ">
                {ProductData?.map((data, key) => (
                  <div className="col-md-3 mb-3">
                    <CardNear
                      index={key}
                      products={data}
                      orderButton={true}
                      key={data.id}
                      addCart={addCart}
                    />
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
}

export default Detail;
