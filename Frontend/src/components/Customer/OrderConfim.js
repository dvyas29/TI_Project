import React, { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../config/configBackendURL";
import {
  Navbar,
  Container,
  Button,
  NavDropdown,
  Form,
  FormControl,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CustNavbar from "./CustNavbar";
import { useCart } from "react-use-cart";
import emptyCartImg from '././../../images/empty_cart.png'
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
//const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items") || "[]");

function OrderConfirm() {
  const accessToken = localStorage.getItem("accessToken");
  const { isEmpty, totalUniqueItems, cartTotal , items, totalItems, updateItemQuantity, removeItem } =
    useCart();

  const { emptyCart } = useCart();
  const [noItem, setNoItem] = useState(items.totalItems);
  const history = useHistory();
  const [bearer, setBearer] = useState("");
  const [userid, setUserId] = useState(localStorage.getItem("id"));
  const [cart, setCart] = useState(cartFromLocalStorage);
  //const [items, setItems] = useState(itemsFromLocalStorage);
  const [restName, setRestName] = useState("");
  const [restId, setRestId] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("delivery");
  const [total, setTotal] = useState(0);
  const [dishName, setDishName] = useState("");
  const [qty, setQty] = useState("");
  const [custName, setCustName] = useState("");
  const [custAddress, setCustAddress] = useState([]);
  const [address, setAddress] = useState("no");
  const [newAddress, setNewAddress] = useState("");
  const [restidInCart,setRestidInCart] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showPlaceOrder, setShowPlaceOrder] = useState(
    localStorage.getItem("placeOrder")
  );
  const [showAddressField, setShowAddressField] = useState(false);

  const id = localStorage.getItem("id");
  useEffect(() => {
    axios({
      method: "get",
      url: BACKEND_URL + `/deliveryAddresses/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("axios response address data get", response.data.data);
        setCustAddress(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    setRestName(cart.restName);
    setRestId(cart.restid);
    setQty(items.quantity);
    setDishName(items.dishName);

    setModeOfDelivery(cart.modeOfDelivery);
    setCustName(cart.custName);
    setShowPlaceOrder(localStorage.getItem("placeOrder"));

    items.map((item) => {
      setModeOfDelivery(item.modeOfDelivery);
    });

    let t = 0;
    items.map((item) => {
      t = item.cartTotal;
    });
    setTotal(t);
    let rest;
    items.map((item) => {
      rest = item.restid;
    });
    setRestidInCart(rest)
  }, []);

  const radioChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const newAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const newspecialInstructions = (e) => {
    setSpecialInstructions(e.target.value);
    console.log(e.target.value);
  };
  const searchByModeOfDelivery = (e) => {
    setModeOfDelivery(e.target.value);
  };
  const addspecialInstructions = (e) => {
    console.log(specialInstructions);
  };
  const addAddress = (e) => {
    setShowAddressField(!showAddressField)
    e.preventDefault();

    let body = {
      custid: id,
      address: newAddress,
    };

    axios({
      method: "post",
      url: BACKEND_URL + "/deliveryAddresses",
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setAddress(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios({
      method: "get",
      url: BACKEND_URL + `/deliveryAddresses/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // console.log("axios response address data get", response.data.data);
        setCustAddress(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const gotorestaurant = () => {
    //console.log("clicked restaurant", restId);
    if (localStorage.getItem("cart") === "[]") {
      history.push("/custDashboard");
    } else {
      history.push(`/custrestaurant/${restidInCart}`);
    }
  };
  const placeOrder = (e) => {
    e.preventDefault();
    if (modeOfDelivery === "delivery" && address === "no") {
      alert("Please select the address");
      return;
    } else {
      //console.log("Thank you for placing the order");
      //   const cart1={custName: cart.custName, modeOfDelivery: modeOfDelivery, restName:restName , restid:restId };
      //   const items1={description: , dishImageUrl: , dishName: , dishid: , price: , qty: };
      // console.log("------final order cart---", cart);
      //console.log("------final order items---", items);
      cart.modeOfDelivery=modeOfDelivery;
      const body = {
        cart: cart,
        items: items,
        total: cartTotal,
        address: address,
        specialInstructions,
        quantity: totalItems,
        uniqueItems:totalUniqueItems
      };

       console.log("body", body);
      axios({
        method: "post",
        url: BACKEND_URL + "/orders",
        data: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          // console.log("order placed", response.data);
        })
        .catch((error) => {
          console.log("error", error.response);
        });
      alert("Thank you for the order");
      localStorage.setItem("cart", "[]");

      localStorage.setItem("placeOrder", "No");

      setTotal(0);
      emptyCart();
      // window.location.reload();
      history.push("/custDashboard");
    }
  };
  const updateQuantity = (id, x) => {
   // setQty(x);
    updateItemQuantity(`${id}`, x);
  };

  // console.log("mod",modeOfDelivery);
  const showAddressFieldChanger =()=>{
    setShowAddressField(!showAddressField)
  }
  return (
    <div>
      <CustNavbar />
      <Container fluid>
        {!isEmpty ? (
          <div>
            {modeOfDelivery === "pick up and delivery" ? (
              <div>
                <Row>
                  <Col>
                    <h3>Select the mode of delivery</h3>
                    <ToggleButtonGroup
                      style={{ width: "60%", marginInlineStart: "12%" }}
                      type="radio"
                      name="options"
                      required
                    >
                      <ToggleButton
                        variant="light"
                        id="tbg-radio-2"
                        value="delivery"
                        onChange={searchByModeOfDelivery}
                      >
                        <span style={{ padding: "10px", borderRadius: "5px" }}>
                          Delivery
                        </span>
                      </ToggleButton>
                      <ToggleButton
                        variant="light"
                        id="tbg-radio-3"
                        value="pick up"
                        onChange={searchByModeOfDelivery}
                      >
                        <span style={{ padding: "10px" }}>Pick Up</span>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                </Row>
              </div>
            ) : null}
            <Row>
              <Col xs={10} sm={7} md={7} lg={7}>
                <div className="mt-3">
                  {" "}
                  <h1>{restName}</h1>
                </div>
                {modeOfDelivery === "delivery" ? (
                  <div>
                    <Row>
                      {custAddress.length ? <h4>Select the address</h4> : null}
                    </Row>
                    <form>
                      {custAddress.map((address) => {
                        return (
                          <div>
                            <input
                              className="mb-3"
                              type="radio"
                              id="add"
                              name="address"
                              value={address.address}
                              onClick={radioChangeAddress}
                              required
                            />
                            <label style={{ padding: "10px" }} forHTML="html">
                              <h6>{address.address}</h6>
                            </label>
                          </div>
                        );
                      })}
                    </form>

                    <Row>
                    {!showAddressField && <Button type="submit" variant="dark" size="md" style={{ width: "30%", marginLeft:"45%" }}
                    onClick={showAddressFieldChanger}>
                          + Add Address
                        </Button>}
                     {showAddressField && <div> <h3>Add New Address for Delivery</h3>
                      <Form onSubmit={addAddress}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Enter Your Address Here</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={newAddressChange}
                            style={{ width: "60%", height: "70%" }}
                          />
                        </Form.Group>
                        <Button type="submit" variant="dark" size="md">
                          Add
                        </Button>

                      </Form></div>}
                    </Row>
                  </div>
                ) : (
                  <div className="mt-3">
                    <h4>
                      Pick up orders will be ready within 45 minutes once order
                      is placed
                    </h4>
                  </div>
                )}
              </Col>
              <Col xs={8} sm={5} md={4} lg={5} className="mt-3 mr-2" >
                <Button
                  className="mb-4 btn-dark"
                  style={{ width: "100%", height:"11%" }}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
                <Row>
                  {items.map((item) => {
                    return (
                      <div>
                        <Row>
                          <Col xs={3} sm={2} md={2} lg={2}>
                         
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
                          <Col xs={4} sm={5} md={5} lg={5}>
                            <img
                              className="card-img-top"
                              src={item.dishImageUrl}
                              alt={item.dishName}
                              style={{ width: "60%", height: "70%" }}
                            />
                          </Col>
                          <Col xs={3} sm={3} md={3} lg={3}>
                            <Row> {item.dishName}</Row>
                          </Col>

                          <Col className="text-end" xs={2} sm={2} md={2} lg={2}>
                            <Row>${item.price * item.quantity}</Row>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}{" "}
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <h4>Total</h4>
                  </Col>
                  <Col style={{ marginLeft: "70%" }}>
                    {" "}
                    <h4>${cartTotal}</h4>
                  </Col>
                </Row>
                <hr />
                <Row className="mt-4">
                  <h5>Add special instructions for the restaurant</h5>
                  
                  <textarea
                    rows="2"
                    style={{ width: "98%", height: "70%", backgroundColor:"" }}
                    onChange={newspecialInstructions}
                  />
                </Row>
              </Col>
            </Row>
          </div>
        ) : (
          <div><Button
          className="auto-ms mt-5 mb-2"
          type="submit"
          variant="dark"
          size="md"
          style={{ width: "30%" ,marginLeft:"38%"}}
          onClick={gotorestaurant}
        >
          {" "}
          Add Items
        </Button><img
         
          src={emptyCartImg}
          alt="emptyacart"
          style={{ marginLeft:"18%", width: "70%", height:"20%" }}
        /></div>
        )}
      </Container>

      {/* <Button
        className="mb-3 btn-dark"
        style={{ width: "100%" }}
        onClick={updateQuantity}
      ></Button> */}
    </div>
  );
}

export default OrderConfirm;


