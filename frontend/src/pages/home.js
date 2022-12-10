import { useNavigate } from 'react-router-dom';
import { React, Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import photo1 from '../img/photo-1.png'
import selectRes from '../img/selectRes.png'
import selectMenu from '../img/selectMenu.png'
import waitDelivery from '../img/waitDelivery.png'
import illustration4 from '../img/illustration-4.png'

import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';

const Home = () => {
    const restaurant = [
        { name: 'Restaurant 1' },
        { name: 'Restaurant 2' },
        { name: 'Restaurant 3' },
        { name: 'Restaurant 4' }
    ]

    const instruction = [
        {
            img: selectRes,
            title: 'Select Restaurant',
            description: 'Non enim praesent elementum facilisis leo vel fringilla. Lectus proin nibh nisl condimentum id. Quis varius quam quisque id diam vel.'
        },

        {
            img: selectMenu,
            title: 'Select Menu',
            description: 'Eu mi bibendum neque egestas congue quisque. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Odio ut sem nulla pharetra diam sit amet.'
        },

        {
            img: waitDelivery,
            title: 'Wait for Delivery',
            description: 'Nunc lobortis mattis aliquam faucibus. Nibh ipsum consequat nisl vel pretium lectus quam id leo. A scelerisque purus semper eget. Tincidunt arcu non.'
        }
    ]

    const navigate = useNavigate()
    const [selected, setSelected] = useState(restaurant[0])

    return (
        <>
            <Header />

            {/* Photo-1 */}
            <div className="flex items-center justify-center px-28 mb-24 bg-gradient-to-r from-rose-100 to-teal-100">
                <div>
                    <h1 className='font-bold text-6xl mb-2 text-gray-800 w-3/5'>The Best Restaurants In Your Home</h1>
                    <p className='mb-2 text-gray-500 w-2/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>

                    <div className='flex mt-10'>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1 w-1/2 mr-4">
                                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {restaurant.map((res, resIdx) => (
                                            <Listbox.Option
                                                key={resIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={res}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-normal text-gray-500' : 'font-light text-gray-500'
                                                                }`}
                                                        >
                                                            {res.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>

                        <button className="bg-orange-500 p-2 px-3 rounded-2xl border-2 border-orange-500 relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-white group"
                            onClick={() => { navigate("./order") }}>
                            <span className="w-0 h-0 rounded bg-white absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                            <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500 z-10">
                                ORDER NOW
                            </span>
                        </button>
                    </div>
                </div>

                <div className='relative'>
                    <img
                        className="w-9/10 p-4"
                        src={photo1}
                        alt="photo1"
                    />

                    <div className='absolute flex items-center rounded-xl top-40 right-10 bg-white p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-orange-500 rounded-lg mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" className='text-white' />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" className='text-white' />
                        </svg>

                        <div className='pr-5'>
                            <p className='text-gray-700 text-base font-bold tracking-wide'>12 Restaurant</p>
                            <p className='text-gray-500 text-xs'>In Your city</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*How it works */}
            <div className='px-28'>
                <div>
                    <h1 className='font-bold text-4xl mb-2 text-gray-800 text-center'>How It Works</h1>
                    <p className='mt-8 text-gray-500 text-center'>Magna sit amet purus gravida quis blandit turpis cursus. Venenatis tellus in <br />
                        metus vulputate eu scelerisque felis.</p>
                </div>

                <div className='flex items-center text-center justify-center gap-2'>
                    {instruction.map((item, index) => {
                        return (
                            <div key={index} className='px-2'>
                                <img
                                    className='w-auto mt-10 mx-auto'
                                    src={item.img}
                                    alt=''
                                />
                                <h1 className='font-bold text-xl text-gray-800 text-center py-4'>{item.title}</h1>
                                <p className='text-gray-500 text-center text-sm px-2'>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/*favorite restaurant */}
            <div className='px-28 flex my-20'>
                <img
                    className='w-1/2 mx-auto px-3'
                    src={illustration4}
                    alt=''
                />

                <div className='ml-16 my-auto'>
                    <h1 className='font-bold text-4xl mb-2 text-gray-800 w-4/5 pb-8'>Get the menu of your favorite restaurants every day</h1>
                    <div className='flex'>
                        <input type="email" id="email" class="text-gray-900 text-sm rounded-lg shadow-xl focus:outline-0 block w-1/2 p-2.5 mr-4" placeholder="Enter email address" />

                        <button className="bg-orange-500 p-2 px-3 rounded-lg border-2 border-orange-500 relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-white group">
                            <span className="w-0 h-0 rounded bg-white absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                            <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500 z-10">
                                SUBCRIBE
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home;