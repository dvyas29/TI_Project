import React, { useState } from "react";
import "./HomeNavbar.css"
import {Navbar, Container, Button, NavDropdown, Form,FormControl, Row, Col, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsJustify } from "react-icons/bs";

//import BootstrapSwitchButton from "bootstrap-switch-button-react";

function HomeNavbar() {


    return (
<Container fluid>
  <Row className="justify-conent-center">
    <Col  sm={3} md={2} lg={2} className="text-center" style={{padding:"0%"}}>
<Navbar
        bg="light"
        expand="lg"
        className="justify-content-center "
        style={{ height: "90px" }}
      >
        <div className="Container-fluid">
          
          <Navbar.Collapse id="basic-navbar-nav">
           
            <Navbar.Brand href="#">
              <h2>
                Uber
                <span className="load" style={{ color: "#3FC060" }}>
                  Eats
                </span>
              </h2>
            </Navbar.Brand>
            </Navbar.Collapse>
        </div>
      </Navbar>
    </Col>
    <Col  sm={6} md={7} lg={7} className="text-center" style={{padding:"0%"}}>
    <Navbar
        bg="light"
        expand="lg"
        className="justify-content-center"
        style={{ height: "90px" }}
      >
          </Navbar>
    </Col>
    <Col sm={3} md={3} lg={3} className="text-center"  style={{padding:"0%"}}>
    <Navbar
        bg="light"
        expand="lg"
        className="justify-content-center"
        style={{ height: "90px" }}
      >
          <ul class="navbar-nav ">
                <li class="nav-item">
                <Button
                  className="auto-ms"
                  type="submit"
                  variant="dark"
                  size="md"
                  style={{ width: "100%", borderRadius: "10px" }}
                >
                  {" "}
                  <Link style={{ textDecoration: 'none', color:"white" }} id="tologin" to="/login">
                    {" "}
                    Sign In
                  </Link>
                </Button>
                </li>
              </ul>
      </Navbar>
    </Col>
  </Row>
  <div class="big-image">
  <div class="overlay">
  <h1 >
                Uber
                <span className="load h1t" style={{ color: "#3FC060" }}>
                  Eats
                </span>
              </h1>
    <p>"The connection between hungry soul and a masterchef"</p>
  </div>
</div>
</Container>



  );
}

export default HomeNavbar;
