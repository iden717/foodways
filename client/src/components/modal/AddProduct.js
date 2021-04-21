import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Crud } from "../core/CRUD/view";
import { UserContext } from "../../context/userContext";

function AddProduct(props) {
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
    } catch (error) {
      console.log(error);
    }
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
              getProduct.refetch();
              props.setHandleClose();
              setProduct(e);
            }}
          >
            <div className="container mt-4">
              <h2 className="text-center" style={{ color: "#FFC700" }}>
                <strong>Add Product</strong>
              </h2>
              <div className="mb-3 mt-4">
                <input
                  type="text"
                  className="form-control input-app form-control-lg"
                  name="title"
                  onChange={(e) => onChange(e)}
                  placeholder="Title"
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control input-app form-control-lg"
                  name="image"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control input-app form-control-lg"
                  name="price"
                  onChange={(e) => onChange(e)}
                  placeholder="Price"
                />
              </div>
              <button type="submit" className="btn btn-app btn-lg mt-3 mb-4">
                Add
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddProduct;
