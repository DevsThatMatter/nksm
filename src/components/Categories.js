import React from 'react'
import cooler from './Images/Cooler.jpg';
import cycle from './Images/Cycle.jpg'
import mattress from './Images/Mattress.jpg'
import labcoat from './Images/LabCoat.jpg'
import instruments from './Images/Instruments.jpg'
import electronics from './Images/electronics.jpg'
import books from './Images/Books.jpg'
import others from './Images/Others.jpg'

export default function Categories() {

  return (
    <>
      <div classname="main">
        <main className="m-3 h-auto flex flex-row gap-1 justify-around">
          <div className="container__1 flex flex-col w-[23.21vw] gap-y-5">
            <div className='image1 h-[44.01vh]'>
              <img src={cycle} className='h-full rounded-3xl'/>
            </div>
            <div className='image2 h-[43.98vh]'>
            <img src={mattress} className='h-full rounded-3xl'/>
            </div>
          </div>
          <div className="container__2 flex flex-col w-[34.91vw] gap-y-5">
            <div className="image3 h-[58.08vh]">
              <img src={cooler} className='h-full rounded-3xl'/>
            </div>
            <div className='image4__5 flex flex-row gap-4'>
              <div className='image4 w-[17.45vw] h-[31vh]'>
                <img src={labcoat} className='h-full w-full border border-black rounded-3xl'/>
              </div>
              <div className='image5 w-[17.45vw] h-[31vh]'>
                <img src={instruments} className='h-full w-full rounded-3xl'/>
              </div>
            </div>
          </div>
          <div className="container__3 flex flex-col w-[19.9vw] gap-y-7">
            <div className='image6 h-[25.32vh]'>
              <img src={electronics} className='h-full w-full rounded-3xl'/>
            </div>
            <div className='image7 h-[23.3vh]'>
              <img src={books} className='h-full w-full rounded-3xl'/>
            </div>
            <div className='image8 h-[35.2vh]'>
              <img src={others} className='h-full w-full rounded-3xl'/>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
