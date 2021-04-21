import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Crud } from "../../components/core/CRUD/view";
import { UserContext } from "../../context/userContext";

const AddProduct = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ image: null });

  const onChange = (e) => {
    const fileForm = { ...form };
    fileForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(fileForm);
  };

  const payload = {
    mode: "CREATE",
    url: "/product",
    type: "form-data",
    form,
  };

  const payloadGet = {
    mode: "VIEW",
    url: `/products/${state?.user?.id}`,
    cache: "productCache",
  };

  const add = Crud(payload);
  const getProduct = Crud(payloadGet);

  const setProduct = async (e) => {
    e.preventDefault();
    try {
      await add.mutate();
      if (!add.isLoading) {
        getProduct.refetch();
        history.push("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2> Add Product </h2>
        <form onSubmit={(e) => setProduct(e)}>
          <div className="row mt-5">
            <div className="col-md-8 mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                name="title"
                onChange={(e) => onChange(e)}
                placeholder="Title"
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                }}
              />
            </div>
            <div className="col mb-4">
              <input
                type="file"
                className="form-control form-control-lg"
                name="image"
                onChange={(e) => onChange(e)}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-lg"
                name="price"
                onChange={(e) => onChange(e)}
                placeholder="Price"
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                }}
              />
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              class="btn btn-app btn-lg mt-4"
              type="submit"
              style={{
                width: "32%",
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

export default AddProduct;
