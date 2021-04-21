import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function CartEmpty(props) {
  const history = useHistory();
  return (
    <Modal
      dialogClassName="Modal"
      show={props.setShow}
      onHide={props.setHandleClose}
      centered
    >
      <Modal.Body>
        <div className="container mt-4">
          <div className="mb-3">
            <p className="text-center">
              Your cart is empty, please check our product
            </p>
          </div>
          <button
            onClick={() => {
              props.setHandleClose();
              history.push(`/`);
            }}
            className="btn btn-app btn-lg mt-3"
          >
            Go Home
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CartEmpty;
