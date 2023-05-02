import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { TbDog } from 'react-icons/tb'

function CartEle() {
    const [qty, setQty] = useState(1)

    const handleQty = (ele) => {
        if (ele === 0) {
            setQty((prevQty) => prevQty - 1)
        } else {
            setQty((prevQty) => prevQty + 1)
        }
    }

    const notEmptyCart = () => {
        return (
            <div className='bg-rose-400 h-auto m-[110px] rounded-md flex'>
                <div className='bg-rose-600 h-[14vh] w-[60vw]' />
                <div className='bg-rose-900 h-[14vh] w-[40vw] flex flex-col'>
                    <div className='bg-rose-200 w-full h-[60%]'>
                        {/* here let us add an image for the item */}
                        {qty}
                    </div>
                    <div className='bg-rose-950 text-white w-full h-[40%] flex justify-center pt-3 gap-3'>
                        <AiOutlineMinus
                            className='mt-1 hover:bg-amber-500 h-[2.5vh] w-[2.5vh] hover:rounded-full'
                            onClick={() => {
                                handleQty(0)
                            }}
                        />
                        <h3>Qty</h3>
                        <AiOutlinePlus
                            className='mt-1 hover:bg-amber-500 h-[2.5vh] w-[2.5vh] hover:rounded-full'
                            onClick={() => {
                                handleQty(1)
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const emptyCart = () => {
        return (
            <div className='bg-rose-400 h-auto m-[110px] rounded-md flex justify-center'>
                <TbDog className='text-9xl' />
            </div>
        )
    }

    return <>{qty === 0 ? emptyCart() : notEmptyCart()}</>
}

export default CartEle
