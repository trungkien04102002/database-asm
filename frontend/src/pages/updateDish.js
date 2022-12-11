import React from 'react';
import {useEffect, useState} from 'react'
import { useNavigate,useParams } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { deleteDish, getDishes, updateDish } from '../api/userApi';

// export let dishes =[];

const UpdateDish = ({dishes}) => {
    const {resId,dishId} = useParams();
    let dishID = dishId;
    const [status, setStatus] =useState(false);
    const [state,setState] =useState(true);
    const [deleteRes, setDeleteRes] =useState("");
    const navigate = useNavigate();

    let dish = dishes.find( ({ dishID }) => dishID === parseInt(dishId) ) ;


    var notify ='success';
    var titleNotify='Update successful';
    var messageNotify=''

    const [formValue, setformValue] = useState({
        dishID : parseInt(dishID),
        dishName: dish.dishName,
        dishDescription:dish.dishDescription,
        unitPrice:dish.unitPrice,
        isAvailable:dish.isAvailable,
        size:dish.size,
      });


    var deleteHandler = async() => {
        let result = await deleteDish(localStorage.getItem('user'),formValue.dishID)
        if (result["msg"] == "success"){
            navigate("/")
        }
        setDeleteRes("Cannot delete due to inside constraints");
    }

    var updateHandler = async() => {
        setStatus(!status);
        const res = await updateDish(localStorage.getItem('user'),formValue); 
        let result = res;
        if (result["msg"]){
            setDeleteRes(result["msg"]);
            return;
        }
        setDeleteRes("Successfully update")
        // console.log(result);
    }
    const handleChangeText = (event) => {
    setformValue({
        ...formValue,
        [event.target.name]: event.target.value
    });
    }

     //notify
     const handleNotify=()=>{
        Store.addNotification({
            title: titleNotify,
            message: messageNotify,
            type: notify,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2500,
              onScreen: true
            }
          });
      }

    return (
        <>
        <ReactNotifications/>
        <div className="flex justify-center items-center py-8 w-full bg-sky-100">
            <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
             <a href="/" className=" uppercase text-md font-semibold text-center rounded hover:text-blue-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
             </a>
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Update Product</h1>
                <div >
                    {/*Name*/}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="dishName">Name</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="dishName" id="dishName" defaultValue={dish.dishName}></input>
                    </div>

                    {/* Discription */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="dishDescription">Description</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="dishDescription" id="dishDescription" defaultValue={dish.dishDescription}/>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="unitPrice">Price</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="unitPrice" id="unitPrice" defaultValue={dish.unitPrice}/>
                    </div>

                    {/* isAvailable */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="isAvailable">isAvailable</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="isAvailable" id="isAvailable" defaultValue={dish.isAvailable}/>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="size">Size</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="size" id="size" defaultValue={dish.size}/>
                    </div>

                    {/* resID */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">Res ID</label>
                        <input disabled
                        className="border py-2 px-3 text-grey-800 cursor-not-allowed" type="text" name=" discountedPrice" id=" dishDetails" defaultValue={dish.resID}/>
                    </div>

                    {/* Rank */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">Rank</label>
                        <input disabled
                        className="border py-2 px-3 text-grey-800 cursor-not-allowed" type="text" name=" discountedPrice" id=" dishDetails" defaultValue={dish.rank_dish}/>
                    </div>

                    <div className="flex flex-wrap">

                    <button onClick={updateHandler} className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Update</button>
                    <button onClick={deleteHandler} className="block bg-red-400 hover:bg-red-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Delete</button>
                    
                    </div>
                    {deleteRes == "Successfully update" && <p class="text-green-500 pl-8 text-center pt-5">{deleteRes}</p>}
                    {deleteRes != "Successfully update" && <p class="text-red-500 pl-8 text-center pt-5">{deleteRes}</p>}

                </div>
            </div>
            
        </div>
        </>
    );
}

export default UpdateDish;
