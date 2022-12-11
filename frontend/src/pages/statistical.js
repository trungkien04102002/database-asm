import React from 'react';
import {useEffect,useState} from 'react'
import { getCount } from '../api/userApi';
import AdminHeader from '../components/Header/adminHeader';

const Statistical = () => {


    const [keySearch,setKeySearch] = useState('');
    const [state,setState] = useState(false);
    const [users,setUser] = useState([]);
    const [error,setError] = useState("");
    useEffect(()=>{
        (async () => {
        // const order = await await getAllOrder(localStorage.getItem('user'));
        // setListOrder(order);
        if (isNaN(keySearch)){
            setError("Min Payment is a number!");
            return;
        }
        const res = await getCount(localStorage.getItem('user'),keySearch)
        setError("")
        if(res !== undefined){
            if(res.msg===undefined){
                setUser(res);
            }
        }

        if(res !== undefined){
            if(res.msg===undefined){
                setUser(res)
            }
        }

        })()
    },[state])


    const handleChange = (event) => {
        setKeySearch(event.target.value)
    }
    return (
        <>
            <div className="min-h-screen md:flex md:flex-row bg-gray-100 ">
                <AdminHeader/>
                <div className="md:w-full pt-20">
                     {/* search */}
                    <div class="flex items-center md:pl-16 pb-4">   
                        <label for="simple-search" class="sr-only">Min Payment</label>
                        <div class="relative max-w-[350px]">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input onChange={handleChange} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="Min Payment" required/>
                        </div>
                        <button onClick={()=>{setState(!state)}} class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span class="sr-only">Min Payment</span>
                        </button>
                        <p class="text-red-500 pl-8">{error}</p>
                    </div>

                <div className="bg-white rounded-lg overflow-x-auto mx-16 divide-y-2 px-8">
                    <p className="section font-semibold p-4 md:text-justify text-center ">Customer</p>

                    {
                        users.map((user,key)=>(
                            <li key={key} class="cursor-pointer py-3 flex justify-between text-sm items-center mx-auto text-gray-500 font-semibold">
                                <p class="px-4 font-semibold">Customer ID: <b>{user.customerID}</b></p>
                                <p class="px-4 text-gray-600">Name of Customer: <b>{user.customerName}</b></p>
                                <p class="px-4 text-blue-600">Count restaurants: <b>{user.countRestaurant}</b></p>
                            </li>
                        ))
                    }
                </div>

                   
                </div>

            </div>
        </>
    );
}

export default Statistical;
