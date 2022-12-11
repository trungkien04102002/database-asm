import React from 'react';
import { useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react'
import AdminHeader from '../components/Header/adminHeader';
import { getCustomers, getRestaurants } from '../api/userApi';


const Home = () => {

    const navigate=useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orderField,setOrderField] = useState('1');
    const [keySearch,setKeySearch] = useState('')
    const [state,setState] = useState(false);
    const [value, setValue] = useState(1);
    const handleChange = (event) => {
        setKeySearch(event.target.value)
        console.log(keySearch)
    }

    // call api
    useEffect(()=>{
        (async () => {
        // const order = await await getAllOrder(localStorage.getItem('user'));
        // setListOrder(order);
        const res = await getRestaurants(localStorage.getItem('user'),'')
        const user = await getCustomers(localStorage.getItem('user'),orderField,keySearch)
        if(res !== undefined){
            if(res.msg===undefined){
                setRestaurants(res);
            }
        }

        if(user !== undefined){
            if(user.msg===undefined){
                setCustomers(user)
            }
        }

        })()
    },[state])
    return (
        <>
            <>
             <div className="min-h-screen md:flex md:flex-row bg-gray-100 ">
                <AdminHeader/>
      
                <div className="md:w-full">

                {/*restaurant card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 lg:flex lg:justify-between">
                    <p className="font-semibold md:pl-16 pt-20 lg:pt-16 md:text-justify text-center">Nhà hàng</p>
                    </div>
                    
                    <div className="flex md:flex-row flex-col flex-wrap items-center lg:justify-center md:pl-16 gap-4 pt-4 cursor-pointer">

                    {
                        
                        restaurants.map((restaurant,index)=>(
                        
                        <div className="md:basis-1/3 lg:basis-[22%] bg-white p-6 rounded-xl border border-gray-50 hover:bg-blue-100"
                        onClick={()=>{navigate(`/restaurant/${restaurant.resID}`)}}>
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-600 tracking-wide">ResID: {restaurant.resID}</p>
                                    <h3 className="mt-1 text-lg text-blue-500 font-bold">{restaurant.resName}</h3>
                                </div>
                                <div className="bg-gray-200 p-2 md:p-1 xl:p-2 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                        </svg>
                                </div>
                            </div>
                        </div>
                        
                        ))
                    }

                    


                    </div>

                {/*Customer list */}
                <p className="font-semibold md:pl-16 pt-8 lg:pt-8 md:text-justify text-center pb-4">Order in process</p>
                
                {/* search */}
                <div class="flex items-center md:pl-16 pb-4">   
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative max-w-[350px]">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input onChange={handleChange} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="Search" required/>
                    </div>
                    <button onClick={()=>{setState(!state)}} class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>

                {/* sort */}
                <label for="role" className=" md:pl-16 max-w-sm block mb-2 text-sm font-medium text-gray-900 ">Select your role</label>
                <select value={orderField}  onChange={(e)=>{setOrderField(e.target.value);setState(!state)}}  id="role" className="md:ml-16 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                    {/* <option selected>Choose a role</option> */}
                    <option value="1">ID</option>
                    <option value="2">Name</option>
                    <option value="3">Email</option>
                    <option value="4">Spent</option>
                </select>
                
                <button onClick={()=>{navigate("/signup")}} class="p-2.5 ml-16 mb-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <span class="">Add customer</span>
                </button>

                {/* Customer */}
                <div className="bg-white rounded-lg overflow-x-auto mx-16 divide-y-2 px-8">
                
                <div className="flex flex-row justify-between">
                <p className="section font-semibold p-4 md:text-justify text-center ">Customer</p>
                <p className="section font-semibold p-4 md:text-justify text-center ">User name</p>
                <p className="section font-semibold p-4 md:text-justify text-center ">Money spent</p>
                <p className="section font-semibold p-4 md:text-justify text-center ">Accumulated coin</p>


                </div>
                    

                    {
                        customers.map((customer,key)=>(
                            <li key={key} onClick={()=>{navigate(`/updateCustomer/${customer.userID}`)}} class="cursor-pointer py-3 flex justify-between text-sm items-center mx-auto text-gray-500 font-semibold">
                                <p class="px-4 font-semibold">ID: {customer.userID}</p>
                                <p class="text-gray-600">{customer.userName}</p>
                                {/* <p class="px-4 tracking-wider">Cash</p> */}
                                <p class="text-blue-600 pr-12">{customer.moneySpent} VND</p>
                                <p class="md:text-base text-gray-800 pr-16">{customer.accumulatedCoin}</p>
                            </li>
                        ))
                    }

                    <div className="">

                    </div>

                </div>


                </div>

            </div>
        </>
        </>
    );
}

export default Home;
