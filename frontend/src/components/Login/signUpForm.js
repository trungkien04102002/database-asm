import React from "react";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { useNavigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import logo from '../../img/logo.png'
import { signUp } from "../../api/userApi";

const SignInForm = () => {
    const navigate = useNavigate()
    // const [startDate, setStartDate] = useState(new Date());
    const [state,setState] = useState(true);
    // const [state1,setState1] = useState(true);
    const [sex,setSex] = useState('M');
    var result;
    var notify ='warning';
    var titleNotify='Warning';
    var messageNotify='Please enter full input'
    const [deleteRes, setDeleteRes] =useState("");

    // save text
    const [formValue, setformValue] = useState({
        fullName: '',
        phoneNumber:'',
        password: '',
        phoneNumber:'',
        birthday:'1999-11-08',
        email:'',
        sex:'M'
      });
    //text event
    const handleChangeText = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }

    // call api    
    // useEffect(()=>{
    //     (async () => {
    //         const res = await signUp(formValue); 
    //         result =res;
    //         // console.log(result);

    //         if(result === undefined) {
    //             notify ='warning'
    //             titleNotify="Warning"
    //             messageNotify='Please enter full input'
    //             setState1(!state1)
    //         }
        
    //         if(result !==undefined) {
    //             if(result.msg !== undefined) {
    //                 notify ='danger'
    //                 titleNotify="Register failure"
    //                 messageNotify=result.msg;      
    //             }
    //             else if(result.email !== undefined) {
    //                 notify ='success'
    //                 titleNotify="Register successful"
    //                 messageNotify="Please back to Login page to login";
    //             }    
    //         }
    //       })()
    // },[state]);

    var addHandler = async() => {
        console.log(formValue);
        const res = await signUp(formValue); 
        let result = res;
        if (result["msg"]){
            setDeleteRes(result["msg"]);
            return;
        }
        else {
            navigate("/")
        }
        // console.log(result);
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
              duration: 4500,
              onScreen: true
            }
          });
      }

    return (
        <>
            <ReactNotifications />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0 ">

                <div onClick={() => (navigate('/'))} className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-10 mr-2" src={logo} alt="logo" />
                    Luna
                    <span className="text-orange-500 font-bold">Ship</span>
                </div>

                <div className="z-[100] w-full bg-rose-50 rounded-lg shadow shadow-lg md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 rounded-full bg-rose-50 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            <span className="text-orange-500">Sign up</span> to your account
                        </h1>

                        <div className="space-y-4 md:space-y-6">
                             {/* name */}
                             <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Họ và tên</label>
                                <input  onChange={handleChangeText} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tên của bạn là?" required=""/>
                            </div>

                            {/* email */}
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Địa chỉ email</label>
                                <input  onChange={handleChangeText} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                            </div>

                            {/* userName */}
                            <div>
                                <label for="userName" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                                <input  onChange={handleChangeText} type="userName" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="userName" required=""/>
                            </div>

                            {/* phone */}
                            <div>
                                <label for="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
                                <input  onChange={handleChangeText} type="phoneNumber" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="số điện thoại" required=""/>
                            </div>

                            {/* Sex */}
                            <label for="sex" className=" max-w-sm block text-sm font-medium text-gray-900 ">Select your sex</label>
                            <select value={sex}  onChange={(e)=>{setformValue({...formValue,sex: e.target.value});setState(!state)}}  id="sex" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                {/* <option selected>Choose a role</option> */}
                                <option value="M">Male</option>
                                <option value="F">FeMale</option>
                            </select>

                            {/* Birthday */}
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input name="birthday" onChange={handleChangeText} datepicker datepicker-format="mm/dd/yyyy" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Select date"/>
                            </div>

                            

                            {/* password */}
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input  onChange={handleChangeText} type="password" name="password" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="********" required=""/>
                            </div>

                            <button className="w-full bg-orange-500 p-2 px-3 rounded-xl border-2 border-orange-500 relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-white group"
                                onClick={addHandler} type='submit'>
                                <span className="w-0 h-0 rounded bg-white absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                                <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500 z-10">
                                    SIGN UP
                                </span>
                            </button>
                            {/* {deleteRes == "Successfully update" && <p class="text-green-500 pl-8 text-center pt-5">{deleteRes}</p>} */}
                            {deleteRes != "Successfully update" && <p class="text-red-500 text-center pt-4">{deleteRes}</p>}

                            <p className="text-sm font-light text-gray-500">
                                Have an account yet? Sign In
                                <div onClick={() => { navigate('/signIn') }} className="font-medium cursor-pointer text-orange-500 hover:underline">
                                    Sign In now
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInForm