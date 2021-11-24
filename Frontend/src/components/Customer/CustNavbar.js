import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import {Navbar,Container,Button,NavDropdown, Form, FormControl, Row, Col, ToggleButtonGroup, ToggleButton,  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFullscreenExit, BsJustify } from "react-icons/bs";
import { ImCart } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { restaurantlistfilter, searcByhModeOfDeliveryOnly,  restlistforsearch} from "../../action/DashBoardActions";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useCart } from "react-use-cart";
import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import BACKEND_URL from "../../config/configBackendURL";
const cartFromLocalStorage = localStorage.getItem("cart") || "[]";
function CustNavbar() {
  const accessToken = localStorage.getItem("accessToken");
  let history = useHistory();
  const dispatch = useDispatch();

  const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem } =
    useCart();

  const { emptyCart } = useCart();

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [bearer, setBearer] = useState("");
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [smallModal, setSmallModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cart, setCart] = useState(cartFromLocalStorage);
  //const [items, setItems] = useState(itemsFromLocalStorage);
  const [restName, setRestName] = useState("");
  const [restId, setRestId] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("pick up");
  const [total, setTotal] = useState(0);
  const [dishName, setDishName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState("");
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [showPlaceOrder, setShowPlaceOrder] = useState(
    localStorage.getItem("placeOrder")
  );
  const [search, setSearch] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [about, setAbout] = useState("");
  const [isProfileModal, setIsProfileModal] = useState(false);
  let uid = localStorage.getItem("id");
  let role = localStorage.getItem("role");

  const openlgmodal = () => {
    setIsProfileModal(!isProfileModal);
  };
  const id = localStorage.getItem("id");
  useEffect(() => {
    var body = {
      id: id,
    };
    axios({
      method: "get",
      url: BACKEND_URL + "/users",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        //console.log("customer data name", response.data.user);
        //setRestData(response.data);
        setName(response.data.user.name);
        setNickName(response.data.user.nickname);
        setPhone(response.data.user.phone);
        setState(response.data.user.state);
        setCity(response.data.user.location);
        setCountry(response.data.user.country);
        setProfileUrl(response.data.user.profileUrl);
        setDateOfBirth(response.data.data.DOB)
        setAbout(response.data.user.about);
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }, []);


  const handleImageSubmit = (e) => {
    e.preventDefault();
    //console.log("in on submit for image change");
  };
  const handleImageUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };
  const toggleSmallModal = () => {
    setSmallModal(!smallModal);
  };

  // const handleEmailChange = (e) =>{
  //     setEmail(e.target.value);
  // }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handledateOfBirthChange = (e) => {
    e.preventDefault();
    setDateOfBirth(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCountryChange = (value) => {
    setCountry(value);
  };
  const gotorestaurant = () => {
    //console.log("clicked restaurant", restId);
    if (localStorage.getItem("cart") === "[]") {
      history.push("/custDashboard");
    } else {
      history.push(`/custrestaurant/${cart.restId}`);
    }
  };
  const openCart = () => {
    items.map((item)=>{
      setRestName(item.restName);
    })
    setShowPlaceOrder(localStorage.getItem("placeOrder"));
    setLgShow(true);
    let t = 0;
    items.map((item) => {
      t = t + item.itemTotal;
    });
    setTotal(t);
  };
  const gotocustomerorders = () => {
    history.push("/customer/orders");
  };

  const gotofavorites = () => {
    history.push("/favourites");
  };
  const searchByModeOfDelivery = (e) => {
    setModeOfDelivery(e.target.value);
    let body = {
      userId: id,
      modeOfDelivery: e.target.value,
    };
    history.push("/custDashboard");
    dispatch(searcByhModeOfDeliveryOnly(body));
  };
  const emptyCart1 = () => {
    localStorage.removeItem("cart");
    emptyCart();
    localStorage.setItem("placeOrder", "No");
    setShowPlaceOrder(localStorage.getItem("placeOrder"));
    localStorage.setItem("cart", "[]");
    setCart(JSON.parse(localStorage.getItem("cart" || "[]")));
    setRestName("");
  };

  const placeOrder = () => {
    history.push("/orderConfirm");
  };

  const searchRest = (e) => {
    e.preventDefault();
    var body = {
      search_str: search,
      modeOfDelivery: modeOfDelivery,
    };

    //action
    //console.log("body", body);
    dispatch(restlistforsearch(body));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const toggleImageUpdate = (e) => {
    setProfileImageUpdate(!profileImageUpdate);
  };

  const uploadPicture = async (e) => {
    e.preventDefault();

    const file = fileUpload;
    //console.log("file", file);

    // get secure url from our server
    const uploadUrl = await fetch(BACKEND_URL + "/uploadImageS3").then((res) =>
      res.json()
    );
//console.log("uploadimages3 performes this is uploadUrl", uploadUrl)
    // post the image direclty to the s3 bucket
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = uploadUrl.split("?")[0];
     //console.log("After sending image to s3 we get this url", imageUrl);

    // fetch from localhos
    let userInfo = {
     id:id, 
      url: imageUrl,
      
    };

    //req for adding url to db api
    axios
      .put(BACKEND_URL + "/users/image", userInfo)
      .then((response) => {
       // console.log("i nresonseeeeeeeeeeeeeee")
        const urlFromDb = response.data.data.profileUrl;
        setProfileImagePath(urlFromDb);
        setProfileUrl(urlFromDb);
       // console.log("urlfromdb", urlFromDb);
      })
      .catch((error) => {
        alert("Error occured while adding image to data base");
      });
    toggleImageUpdate();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    //console.log("in handle submit");
    let body = {
      id: id,
      name: name,
      DOB: dateOfBirth,
      city: city,
      state: state,
      country: country,
      nickname: nickName,
      phone: phone,
      about: about,
    };

    //console.log("body", body);
    axios({
      method: "put",
      url: BACKEND_URL + "/users",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("update prifile status", response.data);
      })
      .catch((error) => {
        //console.log("coming in error", error.response);
      });

    history.push("/custDashBoard");
  };
 
  const signOut =()=>{
localStorage.clear();

history.replace("/login");
  }
  const updateQuantity = (id, x) => {
    // setQty(x);
     updateItemQuantity(`${id}`, x);
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
                      onClick={gotocustomerorders}
                    >
                      Orders
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Button
                      className="btn btn-light"
                      style={{ width: "100%" }}
                      onClick={gotofavorites}
                    >
                      Favorites
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
                   
                        onClick={signOut}
                        >
                     
                     
                        Sign Out
                      
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    id="tocustdash"
                    className="nav-link"
                    to="/custDashboard"
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
          >
            <ToggleButtonGroup
              style={{ width: "60%", marginInlineStart: "12%" }}
              type="radio"
              name="options"
              required
            >
              <ToggleButton
                variant="light"
                id="tbg-radio-2"
                value={"delivery"}
                onChange={searchByModeOfDelivery}
              >
                <span style={{ padding: "10px", borderRadius: "5px" }}>
                  Delivery
                </span>
              </ToggleButton>
              <ToggleButton
                variant="light"
                id="tbg-radio-3"
                value={"pick up"}
                onChange={searchByModeOfDelivery}
              >
                <span style={{ padding: "10px" }}>Pick Up</span>
              </ToggleButton>
            </ToggleButtonGroup>
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
          >
            <Form className="d-flex" onSubmit={searchRest}>
              <FormControl
                className="l-5 mr-2"
                type="text"
                placeholder="What are you craving?"
              
                onChange={handleSearchChange}
              />
              <Button variant="dark" type="submit">
                Search
              </Button>
            </Form>
          </Navbar>
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
                  className="auto-ml"
                  type="submit"
                  variant="dark"
                  size="md"
                  onClick={openCart}
                >
                  {" "}
                  {<ImCart />} {` `} Cart - {totalItems }
                </Button>
              </li>
            </ul>
          </Navbar>
        </Col>
      </Row>
      <>
     
        {/* cart modal */}
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">

              <h1>{restName}</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={3} sm={4} md={4} lg={4}><Button
                    className="auto-ms mb-3"
                    type="submit"
                    variant="dark"
                    size="md"
                    style={{ width: "100%" }}
                    onClick={gotorestaurant}
                  >
                    {" "}
                    Add Item
                  </Button></Col>
                <Col xs={3} sm={4} md={4} lg={4}>
                  
                  
                </Col>
                {showPlaceOrder === "Yes" ? (  <Col xs={3} sm={4} md={4} lg={4}>  <Button
                      onClick={emptyCart1}
                      className="mb-3 btn btn-dark"
                      style={{ width: "100%" }}
                    >
                      Empty cart
                    </Button></Col>
                    ) : null}
              </Row>

              <Row>
                {items.map((item) => {
                  return (
                    <div>
                      <Row>
                        <Col xs={2} sm={2} md={2} lg={2}>
                        <select
                              className="dropcustom p-2"
                              value={item.quantity}
                              onChange={(e)=>updateQuantity(item.id, e.target.value)}
                              style={{ height: "40px", border: "none", background:"#ECE6E6" }}
                            >
                              
                               
                              {`${item.quantity}`}
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                            </select>
                        </Col>
                        <Col xs={2} sm={3} md={3} lg={3}>
                          <Row> {item.dishName}</Row>
                         
                        </Col>
                        <Col xs={2} sm={3} md={3} lg={3}>
                        
                          <Row>${item.price * item.quantity}</Row>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
                          <img
                            className="card-img-top text-center"
                            src={item.dishImageUrl}
                            alt={item.dishName}
                            style={{ width: "60%", height: "70%"}}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Row>
              {}
              {showPlaceOrder === "Yes" ? (
                <div>
                  
                  <Row className="justify-content-end">
                   
                  </Row>
                  <Button
                    className="auto-ms mb-3"
                    type="submit"
                    variant="dark"
                    size="md"
                    style={{ width: "100%" }}
                    onClick={placeOrder}
                  >
                    Go to Checkout  ${cartTotal}
                  </Button>
                </div>
              ) : null}
            </Container>
          </Modal.Body>
        </Modal>
      </>
{/* //upload profile picture modal */}
      <Modal
        size="lg"
        show={smallModal}
        onHide={() => setSmallModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        style={{ zIndex: 999999999999999 }}
      >
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
            className="btn btn-secondary"
            type="submit"
            onClick={(e) => {
              uploadPicture(e);
            }}
          >
            Done
          </button>
          <button
            className="btn btn-secondary border-left-2"
            onClick={toggleSmallModal}
          >
            Cancel
          </button>
        </form>
      </Modal>

      <Modal
        size="lg"
        show={isProfileModal}
        onHide={() => setIsProfileModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h1 className="text-center">Profile</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <div className="text-center mb-5">
                <img
                  className="card-img-top"
                  style={{ width: "50%", height: "400px" }}
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
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {" "}
                    <div className="row m-1">
                      <label>Nick Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nickName"
                        placeholder={nickName}
                        onChange={handleNickNameChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {" "}
                    <div className="row m-1">
                      <label>Contact Number:</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        placeholder={phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <div className="row m-1">
                      <label>Date Of Birth: (YYYY-MM-DD)</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        placeholder={dateOfBirth}
                        onChange={handledateOfBirthChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {" "}
                    <div className="row m-1">
                      <label>City:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder={city}
                        onChange={handleCityChange}
                      />
                    </div>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <div className="col-3" style={{ width: "100%" }}>
                      <label>State:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        placeholder={state}
                        onChange={handleStateChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {" "}
                    <div className="col-3" style={{ width: "100%" }}>
                      <label>Country:</label>
                      <Select
                        options={options}
                        placeholder={country}
                        value={country}
                        onChange={handleCountryChange}
                      />
                    </div>{" "}
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {" "}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    {" "}
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}></Col>
                </Row>

                <div className="row mt-3 ml-1">
                  <div className="col-2">
                    <button type="submit" className="btn btn-dark">
                      Update
                    </button>
                  </div>
                  <div className="col-8">
                    <Link className="btn btn-danger" to="/users/about">
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
                  <Button className="btn btn-dark" onClick={toggleSmallModal}>
                    Change Profile Picture Here
                  </Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CustNavbar;
