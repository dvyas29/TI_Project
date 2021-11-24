import React, { useState } from "react";
import { Container, Row, Col, Button, Modal  } from 'react-bootstrap';
const cartL = JSON.parse(localStorage.getItem("cart") || "[]");
export const Cart = () => {
  const [total, setTotal] = useState();
  const [cart, setCart] = useState(cartL);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="dark" onClick={handleShow}>
      Launch demo modal
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};
