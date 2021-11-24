import React,{ useState, useEffect } from "react";
import RestNavbar from "./RestNavbar";
import axios from "axios"
import restimg from "./../../images/restaurant_home.jpg";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DishList from "./DishList";
import BACKEND_URL from '../../config/configBackendURL';
function RestDashboard() {
  const [bearer, setBearer] = useState("");
  const[restData, setRestData]= useState([]);
  const[dishData, setDishData]= useState([]);

  const id=localStorage.getItem("id");

  useEffect( () => {
console.log("inside useeffect")
    var body={
      restId:id
    }
   
         axios({
            method: "post",
            url: BACKEND_URL + "/getRestProfile",
            data: body,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
          })
            .then((response) => {
                
           //   console.log("axios response", response.data);
           setRestData(response.data);
           console.log("restdata",response.data)
            })
            .catch((error) => {
              console.log((error.response));
            });
             axios({
            method: "post",
            url: BACKEND_URL + "/getRestProfile",
            data: body,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
          })
            .then((response) => {
                
              console.log("axios response", response.data);
           setRestData(response.data);
           console.log("restdata",response.data)
            })
            .catch((error) => {
              console.log((error.response));
            });
    
        },[])
  const dummy_data = [
    {
      id: 83,
      name: "Swaraj",
      address: "562, Trends Avenue, Milpitas",
      location: "San Jose",
      description: "We serve Maharashtrian chat!!",
      phone: 536276727,
      timing: "Monday to Sunday 10 am to 10 pm",
      restProfileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
      modeOfDelivery: "delivery",
    },
  ];
  const dishes_data = [
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 2,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 3,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 4,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 5,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 6,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 7,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 8,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 9,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
    {
      restid: 83,
      name: "Paneer Punjabi",
      ingredients: "Paneer,sd,sd,sf,sfs,sf,sff,",
      id: 10,
      price: 10,
      description: "Spicy curry with Punjabi flavor",
      category: "Main Course",
      type: "veg",
      dishImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    },
  ];
  return (
    <div>
      <RestNavbar />
      <Container fluid>
        <Row className="p-4">
          <img
            className="centerimg mt-4"
            style={{
              width: "100%",
              height: "70vh",
              paddingRight: "20px",
              float: "left",
            }}
            src={restData[0].profileUrl}
            alt={restData[0].name}
          />
        </Row>
        <Row>
        <Col sm={4} md={4} lg={4}>
          <h1></h1>
        </Col>
        <Col sm={4} md={4} lg={4}>
          2
        </Col>
        <Col sm={4} md={4} lg={4}>
          3
        </Col>
        </Row>
        <Row>
          <Col sm={9} md={9} lg={9}>
            <h3 style={{ paddingRight: "20px", float: "left" }}>
              Restaurant Menu
            </h3>
          </Col>
          <Col sm={3} md={3} lg={3}>
            <Link
              className="float-end mt-2"
              style={{ paddingRight: "20px", textDecoration: "none" }}
              to="/addDish"
            >
              <h5>Add New Dish</h5>
            </Link>
          </Col>
        </Row>
        {/* <Row>
          <h1 class="display-6 mt-2">Salads</h1>
        </Row>
        <Row>
          <h1 class="display-6 mt-2">Main Course</h1>
        </Row>
        <Row>
          <h1 class="display-6 mt-2">Desserts</h1>
        </Row>
        <Row>
          <h1 class="display-6 mt-2">Beverages</h1>
        </Row> */}

        <Row>
          <Col className="mt-3">
            <DishList dishes={dishes_data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RestDashboard;
