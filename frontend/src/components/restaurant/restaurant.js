import React from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState,useContext } from 'react';
import AdminHeader from '../Header/adminHeader';
import { getDishes } from '../../api/userApi';
import { AddContext } from '../../App';

const Restaurant = () => {

    const {id} = useParams();
    const resID=id;
    const {resApi,setResApi,restaurantID,setRestaurantID}= useContext(AddContext);
    const [dishes,setDishes] = useState([]);
    const [orderField,setOrderField] = useState(1);
    const [keySearch,setKeySearch] = useState('')
    const [state,setState] = useState(false);

    const handleChange = (event) => {
        setKeySearch(event.target.value)
        console.log(keySearch)
    }

    useEffect(()=>{
        (async () => {
            const res = await getDishes(localStorage.getItem('user'),id,orderField,keySearch); 
            
            if(res.msg===undefined){
                setDishes(res);
                setRestaurantID(resID)
            }    
          })()
    },[state,resApi]);

    const navigate=useNavigate();
    return (
        <>
            <div className="min-h-screen md:flex md:flex-row bg-gray-100 ">
                <AdminHeader/>
                <div className="md:w-full">
                {/*Category card */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 lg:flex lg:justify-between">
                <p className="font-semibold md:pl-16 pt-20 lg:pt-16 md:text-justify text-center">List products</p>
                </div>

                <div className="flex flex-row gap-4 flex-wrap justify-between">
                
                {/* sort */}
                {/* <label for="role" className=" md:pl-16 max-w-sm block mb-2 text-sm font-medium text-gray-900 ">Select your role</label> */}
                <select value={orderField}  onChange={(e)=>{setOrderField(e.target.value);setState(!state)}}  id="role" className="md:ml-16 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                    {/* <option selected>Choose a role</option> */}
                    <option value="1">ID</option>
                    <option value="2">Name</option>
                    <option value="3">Price</option>
                    <option value="4">Rank</option>
                </select>

                {/* search */}
                <div class="mr-24 flex items-center md:pl-16 pb-4">   
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

                </div>
                
               

                {/* dishes */}

                <div className="flex md:flex-row flex-col flex-wrap items-center lgjustify-center md:pl-16 gap-4 pt-4 cursor-pointer">
                {
                    dishes.map((dish,index)=>(

                    <div key={index} className="md:basis-1/3 lg:basis-[22%] h-[150px] bg-white p-6 rounded-xl border border-gray-50 hover:bg-blue-100"
                    onClick={()=>{navigate(`${dish.dishID}`)}}>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">ID:{dish.dishID}</p>
                            <h3 className="mt-1 text-lg text-blue-500 font-bold">{dish.dishName}</h3>
                            <p className="text-xs text-gray-600 tracking-wide">Price:{dish.unitPrice}</p>
                            <p className="text-xs text-gray-600 tracking-wide">Rank:{dish.rank_dish}</p>


                        </div>
                        <div className="bg-gray-200 p-2 md:p-1 xl:p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                        </div>
                    </div>
                    </div>

                    ))  
                }
                {/* create dish */}

                <div className="md:basis-1/3 lg:basis-[22%] bg-white p-6 rounded-xl border border-gray-50 hover:bg-blue-100 mb-4"
                    onClick={()=>{navigate('/addDish')}}>
                   
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide"></p>
                            <h3 className="mt-1 text-lg text-blue-500 font-bold uppercase">Creat new food</h3>
                            <span className="mt-4 text-xs text-gray-500"></span>
                        </div>
                        <div className="bg-blue-500 p-2 md:p-1 xl:p-2 m-auto rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    
                </div>


                </div>
            </div>
            </div>
        </>
    );
}

export default Restaurant;
