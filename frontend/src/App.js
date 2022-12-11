import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react'

import './App.css';

import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Error from './pages/error';
import UpdateCustomer from './pages/updateCustomer';
import { getCustomers,getDishes,getRestaurants } from './api/userApi';
import Restaurant from './components/restaurant/restaurant';
import UpdateDish from './pages/updateDish';
import AddDish from './pages/addDish';
import Statistical from './pages/statistical';

export const AddContext = createContext();
export let customers =[];
export let restaurants =[];
export let dishes =[];

function App() {

  // const [customers, setCustomers] = useState([]);
  const [state,setState] =useState(false);
  const [resApi,setResApi] = useState(false);
  const [restaurantID,setRestaurantID] = useState(1);
  // call api
  useEffect(()=>{
    (async () => {

    const res = await getRestaurants(localStorage.getItem('user'),'')
    const user = await getCustomers(localStorage.getItem('user'),1,'')
    const dish = await getDishes(localStorage.getItem('user'),restaurantID,1,'')

    if(user !== undefined){
        if(user.msg===undefined){
            // setCustomers(user);
            // console.log(customers);
            customers=user;
            restaurants=res;
            dishes = dish

        }
    }
    setState(!state)

    })()
},[restaurantID])

  return (
    <>
    <AddContext.Provider value={{resApi,setResApi,restaurantID,setRestaurantID}}>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/updateCustomer/:id" element={<UpdateCustomer  data={customers}/>} />
        <Route path="/restaurant/:id" element={<Restaurant/>} />
        <Route path="/restaurant/:resId/:dishId" element={<UpdateDish dishes={dishes}/>} />
        <Route path="/addDish" element={<AddDish/>} />
        <Route path="/statistical" element={<Statistical/>} />

        

      </Routes>
    </AddContext.Provider>
     
    </>
  );

}

export default App;
