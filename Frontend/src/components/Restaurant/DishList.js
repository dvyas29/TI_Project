import React from "react";
import { Row } from "react-bootstrap";
import DishForRest from "../Restaurant/DishForRest";

function DishList(props) {
  return (
    <Row >
      <div className="card-group p-3" style={{borderLeft:"10px"}}>
        {props.dishes.map((dish) => (
          <DishForRest
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
            onEditDone={props.onEditDone}
          />
        ))}
      </div>
    </Row>
  );
}

export default DishList;
