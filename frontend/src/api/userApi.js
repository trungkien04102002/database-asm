import axios from 'axios';

export const signIn = async(formValue) => {

    if( formValue.userName==='' || formValue.password===''){
        return;
    }

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: "http://localhost:8000/controllers/userController.php/login",
        data: formValue,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const signUp = async(formValue) => {

    if(formValue.userName==='' || formValue.password==='' || formValue.email===''){
        return;
    }

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: "http://localhost:8000/controllers/userController.php/signup",
        data: formValue,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
     
  }

export const getRestaurants = async(token,path) => {

    if(token === undefined){
        return 
    }
    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/controllers/adminController.php/restaurants/${path}`,
        headers: {Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const getCustomers = async(token,orderField,keySearch) => {

    if(token === undefined){
        return 
    }
    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/controllers/adminController.php/customers?orderField=${orderField}&keySearch=${keySearch}`,
        headers: {Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const updateCustomer= async(token,data) => {

    try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url: "http://localhost:8000/controllers/adminController.php/customer",
        data:data,
        headers: {Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const deleteCustomer= async(token,data) => {

    try {
      // make axios post request
      const res = await axios({
        method: "delete",
        url: `http://localhost:8000/controllers/adminController.php/customer?userID=${data}`,
        headers: {Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const getDishes= async(token,resID,orderField,keySearch) => {

    if(token === undefined){
        return 
    }
    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/controllers/adminController.php/dishes?resID=${resID}&keySearch=${keySearch}&orderField=${orderField}`,
        headers: {Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const updateDish= async(token,data) => {

    try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url: "http://localhost:8000/controllers/adminController.php/dish",
        data:data,
        headers: {Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const deleteDish= async(token,data) => {

    try {
      // make axios post request
      const res = await axios({
        method: "delete",
        url: `http://localhost:8000/controllers/adminController.php/dish?dishID=${data}`,
        headers: {Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const createDish= async(token,data) => {

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: "http://localhost:8000/controllers/adminController.php/dish",
        data:data,
        headers: {Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded' }
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

export const getCount= async(token,minPayment) => {

    if(token === undefined){
        return 
    }
    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/controllers/adminController.php/count?minPayment=${minPayment}`,
        headers: {Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }


