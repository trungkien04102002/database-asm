import {useEffect, useState} from 'react'
import { useNavigate,useParams } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import AdminHeader from '../components/Header/adminHeader';
import { createDish } from '../api/userApi';

const AddDish = () => {
    const navigate=useNavigate();
    const [available, setAvailable] =useState(1);
    const [state,setState]=useState(false);
    const [status, setStatus] = useState(false) 
    let res =[]
    var notify ='success';
    var titleNotify='Update successful';
    var messageNotify=''

    const [formValue, setformValue] = useState({
        resID : '',
        dishName:'',
        dishDescription:'',
        unitPrice:0,
        isAvailable:1,
        size:'',
      });

    useEffect(()=>{
        (async () => {
            const res = await createDish(localStorage.getItem('user'),formValue); 
            let result =res;
            // console.log(result);

            if(result === undefined) {
                notify ='warning'
                titleNotify="Warning"
                messageNotify='Please enter full input'
                // setState1(!state1)
            }
        
            if(result !==undefined) {
                if(result.msg !== undefined) {
                    notify ='danger'
                    titleNotify="update failure"
                    messageNotify=result.msg;      
                }
                else if(result.email !== undefined) {
                    notify ='success'
                    titleNotify="Register successful"
                    messageNotify="Please back to home";
                }    
            }
          })()
    },[status]);

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
            <div className="min-h-screen md:flex md:flex-row bg-gray-100 ">
            <AdminHeader/>

            <div class="flex justify-center items-center h-screen w-full">
                <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                    <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Create dish</h1>
                    <div >
                    {/*resID */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="resID">resID</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="resID" id="resID"></input>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="dishName">Name</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="dishName" id="dishName"/>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="dishDescription">Description</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="dishDescription" id="dishDescription"/>
                    </div>

                    {/* unitPrice */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="unitPrice">Price</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="unitPrice" id="unitPrice" />
                    </div>

                    {/* isAvailable */}
                    <label for="role" className=" max-w-sm block mb-2 font-bold text-lg text-gray-900 ">Status</label>
                    <select value={available}  onChange={(e)=>{setAvailable(e.target.value);setState(!state)}}  id="role" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                        {/* <option selected>Choose a role</option> */}
                        <option value="1">Available</option>
                        <option value="0">Not Available</option>
                    </select>

                    {/* size */}
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="size">Size</label>
                        <input onChange={handleChangeText}
                        className="border py-2 px-3 text-grey-800" type="text" name="size" id="size" />
                    </div>



                    <div className="flex flex-wrap">

                    <button onClick={()=>{formValue.isAvailable =available; setStatus(!status) ;handleNotify()}} className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Update</button>

                    
                    </div>

                </div>
                    <div class="uppercase text-md font-semibold text-center p-4 rounded hover:text-blue-500 cursor-pointer" type="submit"
                    onClick={()=>{navigate('/')}}>Back to home</div>
                </div>
                
            </div>

        </div>
        </>
    );
}

export default AddDish;
