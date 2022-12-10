import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo.png'

const Footer = () => {
    return (
        <div className='px-28 pt-24 pb-2 bg-gradient-to-l from-gray-900 to-gray-600 bg-gradient-to-r'>
            <div className='flex border-gray-600 border-b-2'>
                <div className="cursor-pointer w-2/5">
                    <img
                        className="h-8 w-auto inline-block"
                        src={logo}
                        alt="logo"
                    />
                    <span className="font-semibold text-2xl text-white">Luna</span>
                    <span className="font-semibold text-2xl text-orange-500">Ship</span>

                    <h1 className='font-bold text-4xl my-8 text-white w-3/5'>The Best Restaurants In Your Home</h1>
                    <p className='mb-2 text-white font-light w-2/3 mb-16 text-gray-200'>Vitae congue mauris rhoncus aenean. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Tempus egestas sed sed risus pretium quam.</p>
                </div>

                <div className='w-1/5'>
                    <h1 className='font-bold text-xl text-gray-500 mb-8'>MENU</h1>

                    <NavLink to='/about' className="flex flex-row items-center p-1 box-border text-gray-300 hover:text-orange-500 transition delay-200">
                        <p className="font-normal text-sm py-2">Home
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </p>

                    </NavLink>

                    <NavLink to='/about' className="flex flex-row items-center p-1 box-border text-gray-300 hover:text-orange-500 transition delay-200">
                        <p className="font-normal text-sm py-2">About Us
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </p>

                    </NavLink>

                    <NavLink to='/about' className="flex flex-row items-center p-1 box-border text-gray-300 hover:text-orange-500 transition delay-200">
                        <p className="font-normal text-sm py-2">Pages
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </p>

                    </NavLink>

                    <NavLink to='/about' className="flex flex-row items-center p-1 box-border text-gray-300 hover:text-orange-500 transition delay-200">
                        <p className="font-normal text-sm py-2">Contacts
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </p>

                    </NavLink>
                </div>

                <div className='w-2/5'>
                    <h1 className='font-bold text-xl text-gray-500 mb-8'>CONTACTS</h1>

                    <p className="font-normal text-sm py-3 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>

                        1717 Harrison St, San Francisco, CA 94103, United States
                    </p>

                    <p className="font-normal text-sm py-3 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>

                        lunaship@gmail.com
                    </p>

                    <p className="font-normal text-sm py-3 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>

                        +084 9999 999
                    </p>
                </div>
            </div>

            <div className='flex justify-between'>
                <p className='my-8 text-xs text-gray-400'>Copyright © 2022. LunaShip. All rights reserved.</p>

                <div className='flex'>
                    <p className='my-8 text-xs text-gray-400 cursor-pointer'>Privacy Policy</p>
                    <p className='my-8 text-xs text-gray-400 cursor-pointer pl-5'>Terms & Services</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;