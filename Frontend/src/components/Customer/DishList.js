import React, { useState, useEffect } from "react";
import { Row , Modal, Container, Col, Button} from "react-bootstrap";
import Dish from "./Dish";

import { useCart } from "react-use-cart";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
//const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items") || "[]");

function DishList(props) {
 // console.log("restid", props.dishes.restid);
  const { addItem } = useCart();

  const [cart, setCart] = useState(cartFromLocalStorage);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const { emptyCart } = useCart();

  const addToCart = (cartaa, itemsaa, qty) => {

    setSmShow(!smShow);
    localStorage.setItem("placeOrder", "Yes");
    setCart(cartaa);
    localStorage.setItem("cart", JSON.stringify(cartaa));
    addItem(itemsaa, qty);
//console.log(localStorage.getItem("cart").restid);

  };
  const modalOff=()=>{
    setSmShow(!smShow);
  }
  return (
    <Row>
      <div className="card-group p-3">
        {props.dishes.map((dish) => (
          <Dish
            cart={cart}
            addToCart={addToCart}
            key={dish._id}
            id={dish._id}
            name={dish.name}
            dishImageUrl={dish.dishImageUrl}
            description={dish.description}
            category={dish.category}
            type={dish.type}
            price={dish.price}
            ingredients={dish.ingredients}
            restid={dish.restid}
            custName={props.custName}
            restName={props.restName}
            modeOfDelivery={props.modeOfDelivery}
            custId={props.custId}
          />
        ))}
      </div>

     
    </Row>
  );
}

export default DishList;
