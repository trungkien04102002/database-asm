import {useEffect, useState} from 'react'
import { useNavigate,useParams } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { deleteCustomer, updateCustomer } from '../api/userApi';

const UpdateCustomer = ({data}) => {
    const {id} = useParams();
    const prdID=id;
    let res = data.find( ({ userID }) => userID === parseInt(prdID) ) ;

    const [status, setStatus] =useState(false);
    const [deleteRes, setDeleteRes] =useState("");
    // const [post, setPost] = useState();
    const token =localStorage.getItem('user');
    const navigate=useNavigate();

    var notify ='success';
    var titleNotify='Update successful';
    var messageNotify=''

    const [formValue, setformValue] = useState({
        userID: prdID,
        sex:res.sex,
        birthday:res.birthday,
        email:res.email,
        phoneNumber:res.phoneNumber,
        name:res.name,
      });
    

    var deleteHandler = async() => {
        let result = await deleteCustomer(localStorage.getItem('user'),res.userID)
        if (result["msg"] == "success"){
            navigate("/")
        }
        setDeleteRes("Cannot delete due to inside constraints");
    }

    var updateHandler = async() => {
        setStatus(!status);
        const res = await updateCustomer(localStorage.getItem('user'),formValue); 
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

                     {/* userName */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">User name</label>
                        <input disabled
                        className="border py-2 px-3 text-grey-800 cursor-not-allowed" type="text" name=" discountedPrice" id=" dishDetails" defaultValue={res.userName}/>
                    </div>

                    {/*Name*/}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="name">Name</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="name" id="name" defaultValue={res.name}></input>
                    </div>

                    {/* Birthday */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="image">Birthday</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="birthday" id="image" defaultValue={res.birthday}/>
                    </div>

                    {/* Sex */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="category">Sex</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="sex" id="category" defaultValue={res.sex}/>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="price">Email</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="email" id="price" defaultValue={res.email}/>
                    </div>

                    {/* Phone number */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">Phone number</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="phoneNumber" id=" dishDetails" defaultValue={res.phoneNumber}/>
                    </div>

                    {/* Role */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">Role</label>
                        <input disabled
                        className="border py-2 px-3 text-grey-800 cursor-not-allowed" type="text" name=" discountedPrice" id=" dishDetails" defaultValue={res.role}/>
                    </div>

                    {/* Coin */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">Accumulated Coin</label>
                        <input disabled
                        className="border py-2 px-3 text-grey-800 cursor-not-allowed" type="text" name=" discountedPrice" id=" dishDetails" defaultValue={res.accumulatedCoin}/>
                    </div>

                    {/* Money */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor=" dishDetails">Money spent</label>
                        <input disabled
                        className="border py-2 px-3 text-grey-800 cursor-not-allowed" type="text" name=" discountedPrice" id=" dishDetails" defaultValue={res.moneySpent}/>
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

export default UpdateCustomer;
