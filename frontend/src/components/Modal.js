import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/esm/ModalTitle";
import Form from "./Form";

function ModalGeral({
  open,
  onClose,
  title,
  item,
  setOnEdit,
  getData,
  endpoint,
  fields,
}) {
  return (
    <Modal show={open} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <ModalTitle>
          {item ? `Editar ${title}` : `Adicionar ${title}`}
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form
          title={title}
          onEdit={item}
          setOnEdit={setOnEdit}
          getData={getData}
          endpoint={endpoint}
          fields={fields}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ModalGeral;
