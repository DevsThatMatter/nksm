import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { BsHandbag } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import CartEle from './CartEle';

function Navbar() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const SellerDiv = () => {
        if (screenWidth > 400) {
            return (
                <div className='w-[15vh] h-[69px] bg-green-500 flex items-center justify-center text-white rounded-xl'>
                    Seller
                </div>
            );
        } else {
            return null;
        }
    };
    const SearchDiv = () => {
        return (
            <div className='w-[50vw]  h-16 bg-white flex items-center pl-[2%] rounded-xl'>
                <AiOutlineSearch className='text-4xl' />
                <input
                    type='text'
                    placeholder='Search'
                    className='w-full md:w-[692px] bg-white lg:w-[692px] h-16 border-none px-2 py-1 text-lg focus:outline-none rounded-xl'
                />
            </div>
        );
    };

    const LogoDiv = () => {
        return (
            <div className='flex items-center'>
                <h1 className='text-3xl font-bold mr-2 text-gray-900'>NKSM</h1>
                <h4 className='text-gray-700 pt-1 text-lg hidden lg:block'>Nit KKR Student Market </h4>
            </div>
        );
    };

    const handleCartClick = () => {
        setShowCart(!showCart);
    };

    return (
        <div>
            <div className='fixed top-0 left-0 w-screen bg-gray-100 shadow-lg shadow-gray-600 rounded-xl'>
                <div className='max-w-screen-2xl mx-auto px-4 md:px-6'>
                    <div className='flex items-center justify-between py-4'>
                        <div className='flex items-center'>
                            <LogoDiv />
                        </div>
                        <div className='flex-grow flex items-center justify-end'>
                            <div className='flex items-center mr-[5vh] '>
                                {screenWidth <= 375 ? <AiOutlineSearch className='text-4xl' /> : <SearchDiv />}
                            </div>
                            {screenWidth <= 606 ? '' : <SellerDiv className='rounded' />}
                            <div className='ml-[2vw] rounded-full h-12 p-1 w-12 hover:bg-gray-200 flex justify-center' onClick={handleCartClick}>
                                <BsHandbag className='text-3xl hover:scale-110   text-black  cursor-pointer'/>
                            </div>
                            <div className={`rounded-full hover:bg-gray-200 h-12 w-12 flex justify-center  p-2`}>
                                <CgProfile className='text-3xl text-black hover:scale-110' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showCart && <CartEle/>}
        </div>
    );
}

export default Navbar;
