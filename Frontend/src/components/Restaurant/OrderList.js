import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Order from "./Order";

export const OrderList = (props) => {
  return (
    
     <>
        {props.orders.map((order) => (
          
              
            <Order 
              key={order._id}
              id={order._id}
              restName={order.restName}
              orderStatus={order.orderStatus}
              deliveryStatus={order.deliveryStatus}
              modeOfDelivery={order.modeOfDelivery}
              total={order.total}
              custName={order.custName}
              price={order.price}
              dishes={order.dishes}
              time={order.createdAt}
              quantity={order.quantity}
            />
            
          
        ))}
     
     </>
  );
};
