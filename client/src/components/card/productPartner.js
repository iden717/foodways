import toRupiah from "@develoka/angka-rupiah-js";
const ProductPartner = ({ product, index }) => {
  const { id, title, image, price } = product;

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <img
              src={image}
              className="mb-2"
              style={{ objectFit: "cover", width: "100%", height: "150px" }}
            />
            <div className="mb-3">
              <p className="fs-6 fw-bold">{title}</p>
              <small className="fs-6 text-danger">
                {toRupiah(price, { dot: ",", floatingPoint: 0 })}
              </small>
            </div>
            <button
              className="btn btn-danger fw-bold"
              style={{
                boxShadow: "none",
                width: "100%",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPartner;
