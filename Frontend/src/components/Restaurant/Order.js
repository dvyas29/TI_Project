import React from "react";
import { Col, Row ,Button} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

function Order(props) {
  let history = useHistory();

  const gotoorder = () => {
   // console.log("clicked order", props.id);
    history.push(`/restorder/${props.id}`);
  };

  return (

    <>
    
<div className="card w-75" style={{border:"none", width:"80%"}}>
<div className="card-body">
  <h5 className="card-title">{props.custName}</h5>

  <span className="card-text">{props.quantity } items for ${props.total} -  
      
      { props.time.split('T')[0] + " at " + props.time.split('T')[1]}</span>
      <h6>{props.modeOfDelivery }</h6>
      {props.orderStatus==="Cancelled" ? (<div><p className="card-text"  style={{color:'red' , fontWeight:'bold'}}>{props.orderStatus } </p></div>) : (<div><p className="card-text"  style={{color:'green', fontWeight:'bold'}}>{props.orderStatus } </p></div>)}
      <div style={{marginBottom:"-3%",  textDecorationLine:'underline'}} > <Link to= '#' onClick={gotoorder} style={{textDecorationLine:'underline', color:'black'}} >Order Details</Link></div>
</div>
</div>
<hr/>
   </>
    
  );
}

export default Order;
