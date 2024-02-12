import React from 'react'
import { Button } from '../ui/button'

const ProductDetails = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold mt-4">Vintage Leather Messenger Bag</h1>
          <div className="flex items-center space-x-1 my-2">
            <StarIcon className="text-yellow-400" />
            <StarIcon className="text-yellow-400" />
            <StarIcon className="text-yellow-400" />
          </div>
          <p className="text-xl font-semibold">$79.99</p>
          <p className="mt-2 text-gray-700">
            The Vintage Leather Messenger Bag is a timeless accessory that combines style and functionality. Crafted
            from high-quality leather, this bag exudes a sense of sophistication and elegance while offering ample
            storage space for all your essentials.
          </p>
          <p className="mt-2 text-gray-700">
            Whether you are heading to the office or exploring the city, the Vintage Leather Messenger Bag is the perfect
            companion. The adjustable shoulder strap ensures a comfortable fit, while the multiple pockets allow you to
            stay organized on the go.
          </p>
          <div className="mt-4">
            <Button>Send a message</Button>
          </div>
    </div>
  )
}
function StarIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }

export default ProductDetails