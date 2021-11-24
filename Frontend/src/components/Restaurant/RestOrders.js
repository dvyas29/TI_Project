import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import RestNavbar from "./RestNavbar";
import { OrderList } from "./OrderList";
import BACKEND_URL from '../../config/configBackendURL';
import axios from "axios"
function RestOrders() {
  const accessToken = localStorage.getItem("accessToken");

  // const [bearer, setBearer] = useState("");
  // const [modeOfDelivery, setModeOfDelivery] = useState("");
  // const [restName, setRestName] = useState("");
  // const [orderStatus, setOrderStatus] = useState("");
  // const [total, setTotal] = useState("");
  // const [custName, setCustName] = useState("");
  // const [orderId, setOrderId] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [statFilter, setStatFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination]= useState("");
 
  const id = localStorage.getItem("id");


  useEffect(()=>{
    
    
   console.log("Id", id)
         axios({
            method: "get",
            url: BACKEND_URL + `/orders/restaurant/${id}?limit=${limit}&page=${page}`,
            headers: { "Content-Type": "application/json","Authorization": `Bearer ${accessToken}`  },
            
          })
            .then((response) => {
                
         // console.log("axios response orders data get", response.data.data);
          setOrdersData(response.data.data);
          setPagination(response.data.pagination);
            })
            .catch((error) => {
              console.log((error.response));
            });

  },[limit, page])

 
  const handlefilterchange=(e)=>{
    setStatFilter(e.target.value);
    
    if(e.target.value === "All"){
      axios({
        method: "get",
        url: BACKEND_URL + `/orders/restaurant/${id}?limit=${limit}&page=${page}`,
        headers: { "Content-Type": "application/json","Authorization": `Bearer ${accessToken}`  },
        
      })
        .then((response) => {
            
     // console.log("axios response orders data get", response.data.data);
      setOrdersData(response.data.data)
        })
        .catch((error) => {
          console.log((error.response));
        });
    }else{
    
    const body={
      restid:id,
      deliveryStatus: e.target.value
    }
    //console.log("bodyyyyyyyyy", body)
        axios({
          method: "post",
          url: BACKEND_URL + `/orders/filterRestaurant?limit=${limit}`,
          data: body,
          headers: { "Content-Type": "application/json","Authorization": `Bearer ${accessToken}`  },
          
        })
          .then((response) => {
              
       // console.log("cust orders sssssget data", response.data);
        setOrdersData(response.data.data);
        // setOrderStatus(response.data[0].name);
       
        // setCustName(response.data[0].ingredients);
        // setOrderId(response.data[0].orderid);
        // setTotal(response.data[0].total);
        // setRestName(response.data[0].type);
        // setModeOfDelivery(response.data[0].dishImageUrl);
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

    //  console.log("ordrsdata",ordersData)
  return (
    <div>
      <RestNavbar />
      <Container fluid>
        <h2 className="mt-4"> All orders</h2>
       

          <OrderList orders={ordersData} />
        
        <Row className="text-center"  style={{width:"50%", marginLeft:"27%"}}>
        <label className="p-2">Order Status Filter</label>
                          <select
                            className="drop p-2"
                            value={statFilter}
                            onChange={handlefilterchange}
                          >
                            <option disabled selected>
                              -- select an option --
                            </option>
                            <option value="All">All Orders</option>
                            <option value="New Order">New Order</option>
                            <option value="Delivered">Delivered Order</option>
                            <option value="Cancelled">Cancelled Order</option>
                            
                           
                          </select>
        </Row>
        <Row className="mt-5">
          <div class="text-center">
         { pagination && pagination.prev ?( <Button className="btn btn-dark" style={{width:"7%", marginRight:"1%"}} onClick={handlePaginationPrevious} >Previous</Button>):( <Button disabled className="btn btn-dark" style={{width:"7%", marginRight:"1%"}} onClick={handlePaginationPrevious} >Previous</Button>)}
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

                          {pagination && pagination.next ? (<Button className="btn btn-dark" style={{width:"7%", marginLeft:"1%"}} onClick={handlePaginationNext} >Next</Button>):(<Button disabled className="btn btn-dark" style={{width:"7%", marginLeft:"1%"}} onClick={handlePaginationNext} >Next</Button>)}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default RestOrders;
