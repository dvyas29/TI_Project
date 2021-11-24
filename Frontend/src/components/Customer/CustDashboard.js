import React from 'react'
import CustNavbar from './CustNavbar'
import veg from '././../../images/vegetable.png'
import vegan from '././../../images/vegan.jpg'
import nonveg from '././../../images/nonveg.jpg'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RestList from './RestList';

import { restaurantlistfilter , searcByhModeOfDeliveryOnly, restlistfordashue} from '../../action/DashBoardActions'
import { useSelector, useDispatch } from "react-redux";

function CustDashBoard(props) {
    const [cart, setCart] = useState([]);
    //const [id, setId] = useState(0);
    
    const [bearer, setBearer] = useState("");
    const [restaurantsList, setRestaurantsList]=useState([]);
    const [checked, setChecked] = useState(false);
    const [isVeg, setIsVeg] = useState(false);
    const [isNonVeg, setIsNonVeg] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    


    const id = localStorage.getItem('id');
    const dispatch = useDispatch();
    
    const handleClickVeg = () => setIsVeg(!isVeg)
   

    const handleClickNonVeg = () => setIsNonVeg(!isNonVeg)
    

    const handleClickVegan = () => setIsVegan(!isVegan)
   

useEffect( () => {

var body={
    id: id
}
dispatch(restlistfordashue(body));
    

    },[])

    const redux_data=useSelector(state=>state.restaurantListDashboardue);

    const listofrestaurants=redux_data.restList.restList;


const handleChangeisVeg=(e)=>{
    setIsVeg()
}
 
const applyFilter=()=>{

    if (!isVeg && !isNonVeg && !isVegan){
        var body={
            id: id
        }
        dispatch(restlistfordashue(body));
    }else{

    var body1={ id: id, veg: isVeg, nonveg: isNonVeg, vegan: isVegan}
    dispatch(restaurantlistfilter(body1));
    }
    

}
//console.log("listofrestaurants", listofrestaurants)
    return (
        <div>
           <CustNavbar/>
            <Container fluid>
                <Row>
                
                        <h5 className="text-start mb-3">Filters</h5>
                        
                            <Col md-3>
                            <div   className="text-start checkbox mb-2" >
                            <label>
                            <input  className="text-start" type="checkbox" value="veg" onClick={handleClickVeg}/>
                          <img src={veg} alt="veg" style={{width:"12%", marginLeft:"2%"}}/> 
                          
                            </label>
                            </div>
                            </Col>
                            <Col md-3>
                            <div className="text-start checkbox mb-2">
                            <label>
                            <input type="checkbox" value="non-veg" onClick={handleClickNonVeg} checked={isNonVeg} />
                            <img src={nonveg} alt="veg" style={{width:"23%", marginLeft:"2%"}}/> 
                          
                            </label>
                            </div>
                            </Col>
                        
                        
                            <Col md-3>
                            <div className="text-start checkbox">
                            <label>
                            <input type="checkbox" value="vegan" onClick={handleClickVegan} />
                            <img src={vegan} alt="veg" style={{width:"20%", marginLeft:"2%"}}/> 
                           
                            </label>
                            </div>
                            </Col>
                            <Col md-3>
                             <Button className="btn btn-dark" style={{width:"60%"}} onClick={applyFilter}>Apply</Button>
                            </Col>
                            </Row>
                       
                        
                    
                    
  
  
                    <Col  className="mt-3" >
                        <section>
                        <h5> Jump on the restaurant and get the hunger killed!!</h5>
                        {listofrestaurants && <RestList restaurants={listofrestaurants} getUpdatedLS={props.getUpdatedLS}/>}
                         </section>
                       
                    </Col>
            
               
                
            </Container>
        </div>
    )
}
export default CustDashBoard
