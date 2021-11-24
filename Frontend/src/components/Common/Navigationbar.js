import React from 'react'
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Navigationbar() {
    return (
        <Navbar bg="light" expand="lg" className="me-auto">
        <Container>
          <Navbar.Brand href="#home">Uber<span className="load" style={{color:"#3FC060"}}>Eats</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a href="#learn" class="nav-link">1</a>
                    </li> 
                    <li class="nav-item">
                        <a href="#questions" class="nav-link">2</a>
                    </li>
                    <li class="nav-item">
                        <a href="#instructors" class="nav-link">3</a>
                    </li>
                    <li class="nav-item" >
                    <Button className="auto-ms" type="submit" variant="dark" size="md"> <Link id="tologin" to="/login" > Sign In</Link></Button>
                   
                    </li>
                </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Navigationbar
