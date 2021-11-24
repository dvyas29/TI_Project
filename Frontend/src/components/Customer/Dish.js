import React, { useState, useEffect } from "react";
import { Col, Button, Modal, Row, Container } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { IoIosAddCircle } from "react-icons/io";
function Dish(props) {
  const cartFromLocalStorage = localStorage.getItem("cart") || '[]';
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState(cartFromLocalStorage);
  const[showPlaceOrder, setShowPlaceOrder]= useState(localStorage.getItem("placeOrder"))
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const [smShow, setSmShow] = useState(false);
  const [lg, setLg] = useState(false);

  const togglesmModalnew=()=>{
    setLg(!lg);
  }
 //console.log("id in the cart",items[0].restid);
// console.log("id in the props", props.restid);
  const { emptyCart } = useCart();

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value));
  };
  //console.log("id in cart", items[0].restid);

  const getItemData = () => {
    console.log("----inside add to cart from Dish----",props.custName);
    //console.log("----inside add to cart from Dish----",props.custName);
    
    //console.log(items[0].restid);
    if(items.length===0 || items[0].restid===props.restid){
      
    const cart = {
      restid: props.restid,
      restName: props.restName,
      custName: props.custName,
      custid: props.custId,
      modeOfDelivery: props.modeOfDelivery,
    };
    const items1 = {
      id: props.id,
      restName: props.restName,
      restid: props.restid,
      modeOfDelivery: props.modeOfDelivery,
      dishName: props.name,
      dishImageUrl: props.dishImageUrl,
      description: props.description,
      price: props.price,
      qty: qty,
    };
  
    props.addToCart(cart, items1, qty);
    return;
  }else {
    setLg(true);
  }
  };
const cartEmptyOnOk=()=>{
  localStorage.removeItem("cart");
    emptyCart();
    localStorage.setItem("placeOrder", "No")
    setShowPlaceOrder(localStorage.getItem("placeOrder"));
    localStorage.setItem("cart", '[]');
    setCart(JSON.parse(localStorage.getItem("cart") || '[]'));
    setLg(false);
}

  return (

    
    <Col sm={2} md={2} lg={2}>
      <div className="card p-2 mb-4">
        <img
          className="card-img-top"
          src={props.dishImageUrl}
          alt={props.name}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">{`$${props.price}`}</p>
          <p className="card-text">
            The main ingredients are : {props.ingredients}
          </p>
          <div className="mb-3">
            <label className="p-2">Qty</label>
            <select
              className="dropcustom p-2"
              onChange={handleQtyChange}
              style={{ height: "40px" }}
            >
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
          </div>
          <Button
            className="auto-ms"
            variant="dark"
            size="md"
            style={{ width: "100%" }}
            onClick={getItemData}
          >
            Add to cart
          </Button>
        </div>
      </div>
  <Modal
          size="sm"
          show={lg}
          onHide={() => setLg(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                You already have the item(s) from another restaurant! Do you want to empty the cart?
              </Row>
              <Row>
                <Col><Button onClick={cartEmptyOnOk}>OK</Button></Col>
                <Col><Button onClick={togglesmModalnew}>Cancel</Button></Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
   
    </Col>
  );
}

export default Dish;
