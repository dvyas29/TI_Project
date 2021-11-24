import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Button,
  NavDropdown,
  Form,
  FormControl,
  Modal,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import countryList from "react-select-country-list";
import BACKEND_URL from "../../config/configBackendURL";
import axios from "axios";
import { useMemo } from "react";

function RestNavbar() {
  const accessToken = localStorage.getItem("accessToken");

  const [lgShow, setLgShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocaion] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState(false);
  const [profileImagePath, setProfileImagePath] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [bearer, setBearer] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [smallModal, setSmallModal] = useState(false);
  let uid = localStorage.getItem("id");
  let role = localStorage.getItem("role");
  const options = useMemo(() => countryList().getData(), []);
  let history = useHistory();
  const id = localStorage.getItem("id");

  const gotoorders=()=>{
    history.push('/restaurants/orders');
  }
  const toggleImageUpdate = (e) => {
    setProfileImageUpdate(!profileImageUpdate);
  };

  const toggleSmallModal = () => {
    setSmallModal(!smallModal);
  };
  const openlgmodal = () => {
    setLgShow(true);
  };

  useEffect(() => {
    var body = {
      restId: id,
    };
    axios({
      method: "get",
      url: BACKEND_URL + "/users",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("restaurant data", response.data.user);
        //setRestData(response.data);
        setName(response.data.user.name);
        setLocaion(response.data.user.location);
        setPhone(response.data.user.phone);
        setDescription(response.data.user.description);
        setProfileUrl(response.data.user.profileUrl);
        setModeOfDelivery(response.data.user.modeOfDelivery);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocaion(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };
  const handleDeliveryModeChange = (e) => {
    setModeOfDelivery(e.target.value);
  };
  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };
  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
  };
  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const timing =
      fromDate + " to " + toDate + " " + fromTime + " to " + toTime;
    let body = {
      id: id,
      name: name,
      location: location,
      phone: phone,
      description: description,
      timing: timing,

      modeOfDelivery: modeOfDelivery,
    };
    //console.log("all state values", body);
    axios({
      method: "put",
      url: BACKEND_URL + "/users",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("update profile status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    history.push("/restDashBoard");
  };

  const handleImageUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
  };

  const uploadPicture = async (e) => {
    e.preventDefault();
    const file = fileUpload;
   // console.log("file", file);

    // get secure url from our server
    const uploadUrl = await fetch(BACKEND_URL+"/uploadImageS3").then(
      (res) => res.json()
    );

    // post the image direclty to the s3 bucket
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = uploadUrl.split("?")[0];
    // console.log("After", imageUrl);

    // fetch from localhos
    let userInfo = {
      id: uid,
      url: imageUrl,
      
    };

    //req for adding url to db api
    axios
      .put(BACKEND_URL+"/users/image", userInfo)
      .then((response) => {
        const urlFromDb = response.data.profileUrl;
        setProfileUrl(urlFromDb);
       // console.log("urlfromdb", urlFromDb);
      })
      .catch((error) => {
        alert("Error occured while adding image to data base");
      });
    toggleImageUpdate();
  };

  return (
    <Container fluid>
      <Row className="justify-conent-center">
        <Col
          sm={3}
          md={2}
          lg={2}
          className="text-center"
          style={{ padding: "0%" }}
        >
          <Navbar
            bg="light"
            expand="lg"
            className="justify-content-center "
            style={{ height: "70px" }}
          >
            <div className="Container-fluid">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <NavDropdown
                  className="t-4"
                  title={<BsJustify />}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    {" "}
                    <Button
                      className="btn btn-light"
                      style={{ width: "100%" }}
                      onClick={openlgmodal}
                    >
                      Profile
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {" "}
                    <Button
                      className="btn btn-light"
                      style={{ width: "100%" }}
                      onClick={gotoorders}
                    >
                      Orders
                    </Button>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    {" "}
                    <Button
                      className="auto-ms"
                      type="submit"
                      variant="dark"
                      size="md"
                      style={{ width: "100%", borderRadius: "10px" }}
                    >
                      {" "}
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        id="tologin"
                        to="/login"
                      >
                        {" "}
                        Sign Out
                      </Link>
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="#home">
                  {" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    id="tocustdash"
                    className="nav-link"
                    to="/restDashboard"
                  >
                    <h2>
                      Uber
                      <span className="load" style={{ color: "#3FC060" }}>
                        Eats
                      </span>
                    </h2>
                  </Link>
                </Navbar.Brand>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </Col>
        <Col
          sm={3}
          md={4}
          lg={4}
          className="text-center"
          style={{ padding: "0%" }}
        >
          <Navbar
            bg="light"
            expand="lg"
            className="justify-content-center"
            style={{ height: "70px" }}
          ></Navbar>
        </Col>
        <Col
          sm={3}
          md={4}
          lg={4}
          className="text-center"
          style={{ padding: "0%" }}
        >
          <Navbar
            bg="light"
            expand="lg"
            className="justify-content-center"
            style={{ height: "70px" }}
          ></Navbar>
        </Col>
        <Col
          sm={3}
          md={2}
          lg={2}
          className="text-center"
          style={{ padding: "0%" }}
        >
          <Navbar
            bg="light"
            expand="lg"
            className="justify-content-center"
            style={{ height: "70px" }}
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
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    id="tologout"
                    to="/login"
                  >
                    {" "}
                    Sign Out
                  </Link>
                </Button>
              </li>
            </ul>
          </Navbar>
        </Col>
      </Row>
      <Modal  size="lg"
            show={smallModal}
            onHide={() => setSmallModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            style={{ zIndex: 999999999999999 }}>
        <form
          onSubmit={handleImageSubmit}
          encType="multipart/form-data"
          style={{ textAlign: "Center" }}
        >
          <input
            type="file"
            name="newProfileImage"
            onChange={handleImageUpload}
          />
          <button
            className="btn btn-dark"
            type="submit"
            onClick={(e) => {
              uploadPicture(e);
            }}
          >
            Done
          </button>
          <button className="btn btn-dark" onClick={toggleSmallModal}>
            Cancel
          </button>
        </form>
      </Modal>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h1 className="text-center"> Profile</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
            
                  <div className="text-center mb-5">
                    <img
                      className="card-img-top"
                      style={{ width: "50%", height: "200px" }}
                      src={profileUrl}
                      alt="img"
                    ></img>
                  </div>
                  
                   
                    <form onSubmit={handleOnSubmit}>
                    <Row>
  <Col xs={6} sm={6} md={6} lg={6}>
  <div className="row m-1">
                        
                        <label>Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder={name}
                          onChange={handleNameChange}
                        />
                      </div></Col>
  <Col xs={6} sm={6} md={6} lg={6}>   <div className="row m-1">
                          <label>Location:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            placeholder={location}
                            onChange={handleLocationChange}
                          />
                       
                      </div></Col>
  
</Row>
<Row>
  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                        
                        <label>Contact Number:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          placeholder={phone}
                          onChange={handlePhoneChange}
                        />
                      </div></Col>
  <Col xs={6} sm={6} md={6} lg={6}> 
  <div className="row m-1">
                       
                       <label>Description: </label>
                       <input
                         type="text"
                         className="form-control"
                         name="description"
                         placeholder={description}
                         onChange={handleDescriptionChange}
                       />
                    
                   </div>
        </Col>
  
</Row>
<Row>
  <Col xs={6} sm={6} md={6} lg={6}>  <div className="row m-1">
                        {/* <label>Timings:</label> */}
                        
                          <label className="p-2">From day</label>
                          <select
                            className="drop p-2"
                            value={fromDate}
                            onChange={handleFromDateChange}
                          >
                            <option disabled selected>
                              -- select an option --
                            </option>
                            <option value={fromDate}>{fromDate}</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                          </select>
                        </div></Col>
  <Col xs={6} sm={6} md={6} lg={6}><div className="row m-1">
                       
                       <label className="p-2">To Day:</label>
                       <select
                         className="drop p-2"
                         value={toDate}
                         onChange={handleToDateChange}
                       >
                         <option disabled selected>
                           {" "}
                           -- select an option --{" "}
                         </option>
                         <option value={toDate}>{toDate}</option>
                         <option value="Sunday">Sunday</option>
                         <option value="Monday">Monday</option>
                         <option value="Tuesday">Tuesday</option>
                         <option value="Wednesday">Wednesday</option>
                         <option value="Thursday">Thursday</option>
                         <option value="Friday">Friday</option>
                         <option value="Saturday">Saturday</option>
                       </select>
                     </div> </Col>
  
</Row>
<Row>
  <Col xs={6} sm={6} md={6} lg={6}><div className="row m-1">
                        
                        <label className="p-2">From time</label>
                        <select
                          className="drop p-2"
                          value={fromTime}
                          onChange={handleFromTimeChange}
                        >
                          <option disabled selected>
                            {" "}
                            -- select an option --{" "}
                          </option>
                          <option value={fromTime}>{fromTime}</option>
                          <option value="12:00 am">12:00 am</option>
                          <option value="1:00 am">1:00 am</option>
                          <option value="2:00 am">2:00 am</option>
                          <option value="3:00 am">3:00 am</option>
                          <option value="4:00 am">4:00 am</option>
                          <option value="5:00 am">5:00 am</option>
                          <option value="6:00 am">6:00 am</option>
                          <option value="7:00 am">7:00 am</option>
                          <option value="8:00 am">8:00 am</option>
                          <option value="9:00 am">9:00 am</option>
                          <option value="10:00 am">10:00 am</option>
                          <option value="11:00 am">11:00 am</option>
                          <option value="12:00 pm">12:00 pm</option>
                          <option value="1:00 pm">1:00 pm</option>
                          <option value="2:00 pm">2:00 pm</option>
                          <option value="3:00 pm">3:00 pm</option>
                          <option value="4:00 pm">4:00 pm</option>
                          <option value="5:00 pm">5:00 pm</option>
                          <option value="6:00 pm">6:00 pm</option>
                          <option value="7:00 pm">7:00 pm</option>
                          <option value="8:00 pm">8:00 pm</option>
                          <option value="9:00 pm">9:00 pm</option>
                          <option value="10:00 pm">10:00 pm</option>
                          <option value="11:00 pm">11:00 pm</option>
                        </select>
                      </div>  </Col>
  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                          <label className="p-2">To time:</label>
                          <select
                            className="drop p-2"
                            value={toTime}
                            onChange={handleToTimeChange}
                          >
                            <option disabled selected>
                              {" "}
                              -- select an option --{" "}
                            </option>
                            <option value={toTime}>{toTime}</option>
                            <option value="12:00 am">12:00 am</option>
                            <option value="1:00 am">1:00 am</option>
                            <option value="2:00 am">2:00 am</option>
                            <option value="3:00 am">3:00 am</option>
                            <option value="4:00 am">4:00 am</option>
                            <option value="5:00 am">5:00 am</option>
                            <option value="6:00 am">6:00 am</option>
                            <option value="7:00 am">7:00 am</option>
                            <option value="8:00 am">8:00 am</option>
                            <option value="9:00 am">9:00 am</option>
                            <option value="10:00 am">10:00 am</option>
                            <option value="11:00 am">11:00 am</option>
                            <option value="12:00 pm">12:00 pm</option>
                            <option value="1:00 pm">1:00 pm</option>
                            <option value="2:00 pm">2:00 pm</option>
                            <option value="3:00 pm">3:00 pm</option>
                            <option value="4:00 pm">4:00 pm</option>
                            <option value="5:00 pm">5:00 pm</option>
                            <option value="6:00 pm">6:00 pm</option>
                            <option value="7:00 pm">7:00 pm</option>
                            <option value="8:00 pm">8:00 pm</option>
                            <option value="9:00 pm">9:00 pm</option>
                            <option value="10:00 pm">10:00 pm</option>
                            <option value="11:00 pm">11:00 pm</option>
                          </select>
                        </div> </Col>
  
</Row>
<Row>
  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                        {" "}
                        <label>Mode of Delivery:</label>{" "}
                        <div className="col-5">
                          {" "}
                          <select
                            className="drop p-2"
                            placeholder={modeOfDelivery}
                            value={modeOfDelivery}
                            onChange={handleDeliveryModeChange}
                          >
                            <option
                              value={modeOfDelivery}
                            >{`${modeOfDelivery}`}</option>
                            <option value="delivery">Delivery</option>{" "}
                            <option value="pick up">Pick up</option>{" "}
                            <option value="pick up and delivery">
                              Pick up and Delivery
                            </option>{" "}
                          </select>{" "}
                        </div>{" "}
                      </div></Col>
  <Col xs={6} sm={6} md={6} lg={6}> 
  
        </Col>
  
</Row>


                      <div className="row mt-3 ml-1 ">
                        <div className="col-5 text-end">
                          <button type="submit" className="btn btn-dark ">
                            Update
                          </button>
                        </div>
                        <div className="col-5">
                          <Link className="btn btn-danger" to="/restDashboard">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </form>
                    {/* { renderError } */}
                 
            </Row>
          </Container>
          <Container style={{ width: "50%" }}>
            <Row>
              <Col>
                <Row className="text-center mt-3">
                  {" "}
                  <button className="btn btn-dark" onClick={toggleSmallModal}>
                    Change Profile Picture Here
                  </button>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default RestNavbar;
