import React from 'react'
import CustNavbar from './CustNavbar'
import img from './../../images/showcase.svg'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RestList from './RestList';
import rest2 from './../../images/rest2.jpg';
import rest3 from './../../images/rest3.jpg';
import axios from 'axios';
import BACKEND_URL from '../../config/configBackendURL';
import {restlist} from "../../action/DashBoardActionsUE";
import { restaurantlistfilter , searcByhModeOfDeliveryOnly, restlistfordashue} from '../../action/DashBoardActions'
import { useSelector, useDispatch } from "react-redux";
const  custid=localStorage.getItem("id")
function Favorites() {
    const accessToken = localStorage.getItem("accessToken");
    const [cart, setCart] = useState([]);
    //const [id, setId] = useState(0);
    
    const [bearer, setBearer] = useState("");
    const [restaurantsList, setRestaurantsList]=useState([]);
    const [checked, setChecked] = useState(false);
    const [isVeg, setIsVeg] = useState(false);
    const [isNonVeg, setIsNonVeg] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [listofrestaurants, setListofrestaurants]=useState([]);
    
    const id = localStorage.getItem('id');
    const dispatch = useDispatch();
    
    const handleClickVeg = () => setIsVeg(!isVeg)
   
    const handleClickNonVeg = () => setIsNonVeg(!isNonVeg)
    
    const handleClickVegan = () => setIsVegan(!isVegan)
   
useEffect( () => {
    
      axios({
        method: "get",
        url: BACKEND_URL + `/favorites/${id}`,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`  },
        
      })
        .then((response) => {
    console.log("favorites page data", response.data);
    setListofrestaurants(response.data.data);
       
        })
        .catch((error) => {
         console.log((error));
        });
    },[])



    return (
        <div>
           <CustNavbar/>
            <Container fluid>
                <Row>
                
                     <Col  className="mt-3" >
                        <section>
                        <h3> All Restaurants</h3>
                        <RestList restaurants={listofrestaurants}/>
                         </section>
                       
                    </Col> 
                </Row>
               
            </Container>
        </div>
    )
    }
export default Favorites
