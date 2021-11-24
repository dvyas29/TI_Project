
import React from "react";
import "./CustNavbar.css";
import {
  Navbar,
  Container,
  Button,
  NavDropdown,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function CustNavbar() {
    return (
<Container>
  <Row>
    <Col md={4} lg={8}>md=4</Col>
    <Col md={{ span: 2, offset: 2 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
  
  
    <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
    <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
  
  
    <Col md={{ span: 6, offset: 3 }}>{`md={{ span: 6, offset: 3 }}`}</Col>
  </Row>
</Container>
  );
}

export default CustNavbar;



