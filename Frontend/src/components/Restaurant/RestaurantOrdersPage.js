import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import RestNavbar from "./RestNavbar";
import Divider from "../Common/Divider";
import BACKEND_URL from "../../config/configBackendURL";
import axios from "axios";
import Blink from "react-blink-text";

function RestaurantOrdersPage() {
  let { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  //const [orderId, setOrderId] = useState("");
  const [restName, setRestName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [total, setTotal] = useState("");
  const [bearer, setBearer] = useState("");
  const [custName, setCustName] = useState("");
  const [custProfileImage, setCustProfileImage] = useState("");
  const [dishes, setDishes] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderTime, setOrderTime] = useState("");
  const [smallModal, setSmallModal] = useState(false);
  const [isProfChange, setIsProfChange] = useState(false);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [custid, setCustid] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    //    console.log("orderid", id);
    axios({
      method: "get",
      url: BACKEND_URL + `/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        //console.log("axios response orders  data get", response.data.data.orderDetails);
        // console.log("axios response dishes data get", response.data.data.orderDishes);
        //setOrdersData(response.data)
        setOrder(response.data.data.orderDetails);
        setDishes(response.data.data.orderDishes);
        setCustid(response.data.data.orderDetails.custid);
        setRestName(response.data.data.orderDetails.restName);
        setOrderStatus(response.data.data.orderDetails.orderStatus);
        setModeOfDelivery(response.data.data.orderDetails.modeOfDelivery);
        setTotal(response.data.data.orderDetails.total);
        setCustName(response.data.data.orderDetails.custName);
        setCustProfileImage(response.data.data.custProfileUrl);
        setOrderTime(response.data.data.orderDetails.createdAt);
        setSpecialInstructions(
          response.data.data.orderDetails.specialInstructions
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const toggleSmallModal = () => {
    setSmallModal(!smallModal);
  };

  const openlgmodal = () => {
    var body = {
      id: custid,
    };
    axios({
      method: "post",
      url: BACKEND_URL + "/users/getWithId",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("customer data name", response.data.user);
        //setRestData(response.data);
        setName(response.data.user.name);
        setNickName(response.data.user.nickname);
        setPhone(response.data.user.phone);
        setState(response.data.user.state);
        setCity(response.data.user.location);
        setCountry(response.data.user.country);
        //setProfileUrl(response.data.user.profileUrl);
        setDateOfBirth(response.data.data.DOB);
      })
      .catch((error) => {
        console.log(error.response);
      });
    setIsProfChange(!isProfChange);
  };
  const changeStatusToPreparing = (e) => {
    setOrderStatus("Preparing");
    let body = {
      orderId: id,
      orderStatus: "Preparing",
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("update order status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const changeStatusToOnTheWay = (e) => {
    setOrderStatus("On the way");
    let body = {
      orderId: id,
      orderStatus: "On the way",
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("update order status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const changeStatusToDelivered = (e) => {
    setOrderStatus("Delivered");
    let body = {
      orderId: id,
      orderStatus: "Delivered",
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("update order status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const changeStatusToPickUpReady = (e) => {
    setOrderStatus("Pick up Ready");
    let body = {
      orderId: id,
      orderStatus: "Pick up Ready",
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("update order status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const changeStatusToPickedUp = (e) => {
    setOrderStatus("Picked Up");
    let body = {
      orderId: id,
      orderStatus: "Picked Up",
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        ///  console.log("update order status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const renderUpdateOrderStatus = () => {
    return (
      <div>
        {orderStatus === "Order Received" ? (
          <Button
            onClick={changeStatusToPreparing}
            type="submit"
            variant="dark"
            size="md"
          >
            Update status
          </Button>
        ) : null}
        {orderStatus === "Preparing" && modeOfDelivery === "delivery" ? (
          <Button
            onClick={changeStatusToOnTheWay}
            type="submit"
            variant="dark"
            size="md"
          >
            Update status
          </Button>
        ) : null}
        {orderStatus === "Preparing" && modeOfDelivery === "pick up" ? (
          <Button
            onClick={changeStatusToPickUpReady}
            type="submit"
            variant="dark"
            size="md"
          >
            Update status
          </Button>
        ) : null}
        {orderStatus === "On the way" ? (
          <Button
            onClick={changeStatusToDelivered}
            type="submit"
            variant="dark"
            size="md"
          >
            Update status
          </Button>
        ) : null}
        {orderStatus === "Pick up Ready" ? (
          <Button
            onClick={changeStatusToPickedUp}
            type="submit"
            variant="dark"
            size="md"
          >
            Update status
          </Button>
        ) : null}
      </div>
    );
  };

  const renderQuantityBox = (quantity) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #bdbdbd",
        }}
      >
        {quantity}
      </div>
    );
  };

  const statusChange = (e) => {
    const newStatus = e.target.value;
    setOrderStatus(newStatus);

    let body = {
      orderId: id,
      orderStatus: newStatus,
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("update order status", response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error while updating order status");
      });
  };

  return (
    <div>
      <RestNavbar />
      {order && (
        <Container fluid>
          <Row className="mt-3">
            <Col></Col>
          </Row>
          <Row>
            <h2>Order Details : {id}</h2>
          </Row>
          <Row>
            <Col xs={2} sm={3} md={3} lg={3}>
              <div onClick={openlgmodal}>
                <h3> {custName}</h3>
              </div>

              {/* <img src={custProfileImage} width="200px" height="160px" alt="user profile" /> */}
            </Col>
            <Col xs={4} sm={3} md={3} lg={3}>
              <div style={{ paddingLeft: "2rem" }}>
                {dishes.map((dish) => (
                  <Row className="mb-3">
                    <Col xs={2}>{renderQuantityBox(dish.quantity)}</Col>
                    <Col>
                      <h6>{dish.dishName}</h6>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <div>
                {dishes.length} items for ${total}
              </div>
              <div>
                {orderTime &&
                  orderTime.split("T")[0] + " at " + orderTime.split("T")[1]}
              </div>
              {specialInstructions && <div><br/>
                <h5> Special Instructions :
                    {orderStatus==="Cancelled" || orderStatus==="Delivered" || orderStatus==="Picked Up" ?  specialInstructions : (<Blink color="red" text={specialInstructions} fontSize="60">
                </Blink>) }</h5>
              </div>}
            </Col>
            <Col sm={3} md={3} lg={3}>
              <div>
                <h5>Status : {orderStatus}</h5>
                {orderStatus !== "Delivered" &&
                orderStatus !== "Picked Up" &&
                orderStatus !== "Cancelled" &&
                modeOfDelivery === "pick up" ? (
                  <div className="row m-1">
                    <select
                      style={{ width: "50%" }}
                      className="dropcustom p-2"
                      required
                      onChange={statusChange}
                    >
                      <option value={orderStatus}>{`${orderStatus}`}</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Pickup ready">Pickup ready</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="Cancelled">Cancel the order</option>
                    </select>
                  </div>
                ) : null}
                {orderStatus !== "Delivered" &&
                orderStatus !== "Picked Up" &&
                orderStatus !== "Cancelled" &&
                modeOfDelivery === "delivery" ? (
                  <div className="row m-1">
                    <select
                      style={{ width: "50%" }}
                      className="dropcustom p-2"
                      required
                      onChange={statusChange}
                    >
                      <option value={orderStatus}>{`${orderStatus}`}</option>
                      <option value="Preparing">Preparing</option>
                      <option value="On the Way">On the way</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancel the order</option>
                    </select>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
          <Divider />
        </Container>
      )}

      <Modal
        size="lg"
        show={isProfChange}
        onHide={() => setIsProfChange(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h1 className="text-center">Customer Profile</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* <div className="text-center mb-5">
                <img
                  className="card-img-top"
                  style={{ width: "50%", height: "400px" }}
                  src={profileUrl}
                  alt="img"
                ></img>
              </div> */}

              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <div className="row m-1">
                    <label>Name:</label>
                    <label>{name}</label>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  {" "}
                  <div className="row m-1">
                    <label>Nick Name:</label>
                    <label>{nickName}</label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  {" "}
                  <div className="row m-1">
                    <label>Contact Number:</label>
                    <label>{phone}</label>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <div className="row m-1">
                    <label>Date Of Birth: (YYYY-MM-DD)</label>
                    <label>{dateOfBirth}</label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  {" "}
                  <div className="row m-1">
                    <label>City:</label>
                    <label>{city}</label>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <div className="row m-1" style={{ width: "100%" }}>
                    <label>State:</label>
                    <label>{state}</label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <div className="row m-1" style={{ width: "100%" }}>
                    <label>Country:</label>
                    <label>{country}</label>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}></Col>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}></Col>
                <Col xs={6} sm={6} md={6} lg={6}></Col>
              </Row>

              <div className="row mt-3 ml-1">
                <div className="col-2"></div>
                <div className="col-8"></div>
              </div>

              {/* { renderError } */}
            </Row>
          </Container>
          <Container style={{ width: "50%" }}>
            <Row>
              <Col>
                <Row className="text-center mt-3"></Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RestaurantOrdersPage;
