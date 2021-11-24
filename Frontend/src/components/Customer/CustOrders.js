import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import CustNavbar from "./CustNavbar";
import { OrderList } from "./OrderList";
import axios from "axios"
import BACKEND_URL from '../../config/configBackendURL';
function CustOrders() {
  const accessToken = localStorage.getItem("accessToken");

  // const [modeOfDelivery, setModeOfDelivery] = useState("");
  // const [restName, setRestName] = useState("");
  //const [orderStatus, setOrderStatus] = useState("");
  // const [total, setTotal] = useState("");
  // const [custName, setCustName] = useState("");
  // const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const[statFilter, setStatFilter] =useState("");
  // const [quantity, setQuantity] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination]= useState("");
 
const id = localStorage.getItem("id");

  useEffect(() => {
   
         axios({
            method: "get",
            url: BACKEND_URL + `/orders/customer/${id}?limit=${limit}&page=${page}`,
            headers: { "Content-Type": "application/json","Authorization": `Bearer ${accessToken}`  },
            
          })
            .then((response) => {
                
          console.log("cust orders sssssget data", response.data);
          setOrders(response.data.data);
          setPagination(response.data.pagination);
         // setOrderStatus(response.data.data.orderStatus);
    //       setCustName(response.data.data.custName);
    // setOrderId(response.data.data._id);
    // setTotal(response.data.data.total);
    // setRestName(response.data.data.restName);
    // setModeOfDelivery(response.data.data.modeOfDelivery);
    // setQuantity(response.data.data.quantity);
    // setTime(response.data.data.createdAt);
            })
            .catch((error) => {
            ////  console.log((error));
            });
   
  }, [limit, page]);


  const handlefilterchange=(e)=>{
    if(e.target.value==="All"){
      setStatFilter(e.target.value);
      axios({
        method: "get",
        url: BACKEND_URL + `/orders/customer/${id}?limit=${limit}&page=${page}`,
        headers: { "Content-Type": "application/json","Authorization": `Bearer ${accessToken}`  },
        
      })
        .then((response) => {
            
      console.log("cust orders sssssget data", response.data);
      setOrders(response.data.data);
      setPagination(response.data.pagination);
  
        })
        .catch((error) => {
        ////  console.log((error));
        });
    }else{
setStatFilter(e.target.value);

//console.log(e.target.value);

const body={
  custid:id,
  orderStatus: e.target.value
}
//console.log("status filter body", id, e.target.value);
    axios({
      method: "post",
      url: BACKEND_URL + `/orders/filterCustomer?limit=${limit}`,
      data: body,
      headers: { "Content-Type": "application/json","Authorization": `Bearer ${accessToken}`  },
      
    })
      .then((response) => {
          
    console.log("new orders", response.data);
    setOrders(response.data.data);
    //&page=${page}
    //setOrderStatus(response.data.data.orderStatus);
   
    // setCustName(response.data.data.custName);
    // setOrderId(response.data.data._id);
    // setTotal(response.data.data.total);
    // setRestName(response.data.data.restName);
    // setModeOfDelivery(response.data.data.modeOfDelivery);
    // setQuantity(response.data.data.quantity);
    // setTime(response.data.data.createdAt);
      })
      .catch((error) => {
        console.log((error.response));
      });
    }

  }
  const handlePaginationLimit=(e)=>{
    setLimit(parseInt(e.target.value));

  }

  const handlePaginationNext=(e)=>{
    setPage(page+1);
  }
  const handlePaginationPrevious=(e)=>{
    setPage(page-1);
  }
  //console.log("orders", orders)
  return (
    <div>
      <CustNavbar />
      <Container fluid>
        <h2 className="mt-3"> Past orders</h2>
        

          <OrderList orders={orders} />
        
        <Row className="text-center mb-5"  style={{width:"40%", marginLeft:"30%"}}>
        <label className="p-2">Order Status Filter</label>
                          <select
                            className="drop p-2"
                            value={statFilter}
                            onChange={handlefilterchange}
                          >
                            <option disabled selected>
                              -- select an option --
                            </option>
                            <option value="All">All</option>
                            <option value="Order Received">Order Received</option>
                            <option value="Preparing">Preparing</option>
                            <option value="On the way">On the way</option>
                            <option value="Pick up ready">Pick up ready</option>
                            <option value="Picked up">Picked up</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                           
                          </select>
        </Row>
        <Row >
          <div class="text-center">
         { pagination.prev ?( <Button className="btn btn-dark" style={{width:"7%", marginRight:"1%"}} onClick={handlePaginationPrevious} >Previous</Button>):( <Button disabled className="btn btn-dark" style={{width:"7%", marginRight:"1%"}} onClick={handlePaginationPrevious} >Previous</Button>)}
          <select
                            className="drop p-2"
                            value={limit}
                            onChange={handlePaginationLimit}
                          >
                            <option disabled selected>
                              -- select number of pages --
                            </option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                           
                          </select>

                          { pagination.next ? (<Button className="btn btn-dark" style={{width:"7%", marginLeft:"1%"}} onClick={handlePaginationNext} >Next</Button>):(<Button disabled className="btn btn-dark" style={{width:"7%", marginLeft:"1%"}} onClick={handlePaginationNext} >Next</Button>)}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default CustOrders;
