import React from "react";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { useNavigate } from 'react-router-dom'
import logo from '../../img/logo.png'

const SignInForm = () => {
    const navigate = useNavigate()

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
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John" required="" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Corfirm password</label>
                                <input type="password" name="password" id="password" placeholder="Confirm password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">I accept all <a className="font-medium text-primary-600 hover:underline" href="#">terms and conditions</a></label>
                                </div>
                            </div>

                            <button className="w-full bg-orange-500 p-2 px-3 rounded-xl border-2 border-orange-500 relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-white group"
                                onClick={() => { navigate("/") }} type='submit'>
                                <span className="w-0 h-0 rounded bg-white absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                                <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500 z-10">
                                    SIGN UP
                                </span>
                            </button>

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