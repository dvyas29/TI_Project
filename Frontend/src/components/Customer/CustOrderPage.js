import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Divider from "../Common/Divider";
import CustNavbar from "./CustNavbar";
import axios from "axios";
import BACKEND_URL from "../../config/configBackendURL";
function CustOrderPage() {
  let { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [orderId, setOrderId] = useState("");
  const [restName, setRestName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [total, setTotal] = useState("");


  const [order, setOrder] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [bearer, setBearer] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const renderQuantityBox = (quantity) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #bdbdbd'
        }}
      >
        {quantity}
      </div>
    );
  }
  useEffect(() => {
   // setBearer(localStorage.getItem("accessToken"));
    axios({
      method: "get",
      url: BACKEND_URL + `/orders/${id}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("cust orders sssssget data", response.data);
        setOrder(response.data.data.orderDetails);
        setDishes(response.data.data.orderDishes);
        //
        setTotal(response.data.data.orderDetails.total);
        setRestName(response.data.data.orderDetails.restName);
        setOrderStatus(response.data.data.orderDetails.orderStatus);
        setModeOfDelivery(response.data.data.orderDetails.modeOfDelivery);
        setOrderTime(response.data.data.orderDetails.createdAt);
        setSpecialInstructions(
          response.data.data.orderDetails.specialInstructions
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const statusChange = (e) => {
    const newStatus = e.target.value;
    setOrderStatus("Cancelled");

    let body = {
      orderId: id,
      orderStatus: "Cancelled",
    };
    axios({
      method: "put",
      url: BACKEND_URL + "/orders",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
      //  console.log("update order status", response.data);
      })
      .catch((error) => {
      //  console.log(error);
        alert("Error while updating order status");
      });
  };

  return (
    <div>
      <CustNavbar />
     {order && <Container fluid>
        <Row className="mt-3">
          <Col>
        
          </Col>
        </Row>
        <Row>
          <h2>Order Details : {id}</h2>
        </Row>
        <Row>
          <Col xs={2} sm={3} md={3} lg={3}>
            <h3> {restName}</h3>
            {/* <img src={custProfileImage} width="200px" height="160px" alt="user profile" /> */}
          </Col>
          <Col xs={4} sm={3} md={3} lg={3}>
            <div style={{paddingLeft: "2rem" }}>
              {dishes.map((dish) => (
                <Row className="mb-3">
                  <Col xs={2}>
                    {renderQuantityBox(dish.qty)}
                  </Col>
                  <Col>
                    <h6>{dish.dishName}</h6>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>
          <Col sm={3}>
            <div>
              {dishes.length} items for ${total}
            </div>
            <div>
            {orderTime && (orderTime.split('T')[0] + " at " + orderTime.split('T')[1])}
            </div>
            {specialInstructions && <div><br/>
                <h5> Special Instructions : {specialInstructions}
                    </h5>
              </div>}
          </Col>
          <Col sm={3}>
            <div>
              <h5>Order Status : {orderStatus}</h5>
              {orderStatus === "Order Received" ? (
              <div className="row m-1">
               <button  type="button" onClick={statusChange} className="btn btn-dark " style={{width:"80%"}}>
                          Cancel Order
                        </button>
              </div>
            ) : null }
             
            </div>
          </Col>
        </Row>
        <Divider />
      </Container>}
      
    </div>
  );
}

export default CustOrderPage;
