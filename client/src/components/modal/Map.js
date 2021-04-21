import { MapRender } from "../Map";
import { Modal } from "react-bootstrap";

function MapModal(props) {
  return (
    <Modal
      dialogClassName="modal-map"
      show={props.setShow}
      onHide={props.setHandleClose}
      centered
    >
      <Modal.Body dialogClassName="">
        <MapRender setHide={props.setHandleClose} />
      </Modal.Body>
    </Modal>
  );
}
export default MapModal;
