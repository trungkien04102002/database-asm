import { React, Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Popover, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../../img/logo.png'


const Header = () => {
    const restaurant = [
        { href: '/restaurant', label: 'Restaurant' },
        { href: '/restaurantcard', label: 'Restaurant Card' },
        { href: '/checkout', label: 'Checkout' }
    ]

    const navigate = useNavigate();

    return (
        <>
            <Popover className="relative bg-gradient-to-r from-rose-100 to-teal-100 px-28">
                <div className="flex justify-between items-center py-8">
                    <Popover.Group as="nav" className="flex justify-start">
                        <div className='flex justify-left pr-10'>
                            <div className="cursor-pointer flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src={logo}
                                    alt="logo"
                                />
                                <span className="font-semibold text-2xl">Luna</span>
                                <span className="font-semibold text-2xl text-orange-500">Ship</span>
                            </div>
                        </div>

                        <NavLink to='/' className={({ isActive }) =>
                            isActive ? "flex flex-row items-center p-2 px-4 box-border text-orange-500 border-b-2 border-orange-200" : "flex flex-row items-center p-1 px-4 box-border hover:text-orange-500 transition delay-200"
                        }>
                            <p className="font-normal text-base">Home</p>

                        </NavLink>

                        <NavLink to='/about' className={({ isActive }) =>
                            isActive ? "flex flex-row items-center p-2 px-4 box-border text-orange-500 border-b-2 border-orange-200" : "flex flex-row items-center p-1 px-4 box-border hover:text-orange-500 transition delay-200"
                        }>
                            <p className="font-normal text-base">About Us</p>

                        </NavLink>

                        <Menu as="div" className="flex flex-row text-left px-4">
                            <Menu.Button className="flex flex-row items-center px-4 box-border hover:text-orange-500 transition delay-200">
                                Restaurants
                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 hover:text-orange-500"
                                    aria-hidden="true"
                                />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >

                                <Menu.Items className="origin-top-right top-14 absolute p-3 mt-4 w-52 shadow-lg drop-shadow-2xl bg-white ring-1 ring-black ring-opacity-5 outline-0">

                                    {restaurant.map((res, index) => {
                                        return (
                                            <Menu.Item as="div" key={index}>
                                                <NavLink to={'.' + res.href} className={({ isActive }) =>
                                                    isActive ? "flex flex-row items-center py-4 px-1 box-border text-orange-500" : "flex flex-row items-center py-4 px-1 box-border hover:text-orange-500 hover:translate-x-2 transition delay-200"
                                                }>
                                                    <p className="font-normal text-base">{res.label}</p>

                                                </NavLink>
                                            </Menu.Item>
                                        )
                                    })}

                                </Menu.Items>
                            </Transition>
                        </Menu>

                        <NavLink to='/page' className={({ isActive }) =>
                            isActive ? "flex flex-row items-center p-2 px-4 box-border text-orange-500 border-b-2 border-orange-200" : "flex flex-row items-center p-1 px-4 box-border hover:text-orange-500 transition delay-200"
                        }>
                            <p className="font-normal text-base">Pages</p>

                        </NavLink>

                        <NavLink to='/contact' className={({ isActive }) =>
                            isActive ? "flex flex-row items-center p-2 px-4 box-border text-orange-500 border-b-2 border-orange-200" : "flex flex-row items-center p-1 px-4 box-border hover:text-orange-500 transition delay-200"
                        }>
                            <p className="font-normal text-base">Contacts</p>

                        </NavLink>
                    </Popover.Group>

                    <div className='flex justify-end'>
                        <button className='bg-white px-3 rounded-2xl mr-4' onClick={() => { navigate("./cart") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-orange-500 hover:scale-110">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>

                        <button className='bg-white px-3 rounded-2xl mr-4' onClick={() => { navigate("./signin") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-orange-500 hover:scale-110">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </button>

                        <button className="bg-orange-500 p-2 px-3 rounded-2xl border-2 border-orange-500 relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-white group"
                            onClick={() => { navigate("./order") }}>
                            <span className="w-0 h-0 rounded bg-white absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                            <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500 z-10">
                                ORDER NOW
                            </span>
                        </button>
                    </div>
                </div>
            </Popover >
        </>
    )
}

export default Header;