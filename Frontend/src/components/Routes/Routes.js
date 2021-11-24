import React, { useState, useEffect  } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Common/Login';
import SignUp from '../Common/SignUp';
import Home from '../Common/Home'
import CustDashboard from '../Customer/CustDashboard'
import RestDashboard from '../Restaurant/RestDashboard'
import RestProfile from '../Restaurant/RestProfile'
import RestOrders from '../Restaurant/RestOrders'
import CustProfile from '../Customer/CustProfile'
import CustOrders from '../Customer/CustOrders'
import CustAbout from '../Customer/CustAbout'
import CustNavbar from '../Customer/CustNavbar'
import HomeNavbar from '../Common/HomeNavbar'
import Favourites from '../Customer/Favourites'
import AddDishForm from '../Restaurant/AddDishForm'
import RestaurantPage from '../Customer/RestaurantPage';
import DishEdit from '../Restaurant/DishEdit';
//import Cart  from '../Customer/Cart';
import CustOrderPage from '../Customer/CustOrderPage';
import RestaurantOrdersPage from '../Restaurant/RestaurantOrdersPage';
import OrderConfirm from '../Customer/OrderConfim'
import CustNavDash from '../Customer/CustNavDash';
import CustDashBoard from '../Customer/CustDashboard';
import CustDashboardParent from '../Customer/CustDashboardParent';
import Favorites from '../Customer/Favourites'

function Routes() {
    const [logIn, setLogIn] =useState()
   useEffect(() => {
    localStorage.getItem('accessToken') ? setLogIn(1) : setLogIn(0)
      
   }, [logIn])

   
        return (
            <div>
                {logIn ? (<div>
             
                <Route exact path='/' component={ HomeNavbar } />
                <Route path='/signup' component={ SignUp } />
                <Route path='/login' component={ Login } />
                <Route path='/restaurants/orders' component={ RestOrders } />
                <Route path='/addDish' component={ AddDishForm } />
                <Route path='/favorites' component={ Favorites } />
                <Route path='/custDashboard' exact component={ CustDashboard } />
                <Route path='/restDashBoard' exact component={ RestDashboard } />
                <Route path='/customer/profile' component={ CustProfile } />
                <Route path='/restaurants/profile' exact component={ RestProfile } />
                <Route path='/customer/orders' component={ CustOrders } />
                <Route path='/customer/about' component={ CustAbout } />
                <Route path='/favourites' component={ Favourites } />
                <Route path='/orderConfirm' component={ OrderConfirm } exact />
                <Route path='/custrestaurant/:id'  component={ RestaurantPage } exact />
                <Route path='/custorder/:id'  component={ CustOrderPage } exact />
                <Route path='/restorder/:id'  component={ RestaurantOrdersPage } exact />
                <Route path='/dishEdit/:id' component={ DishEdit } /></div>) : 
               ( <div>
                    <Login/>
                    </div>)}

            </div>
        )
    }


export default Routes