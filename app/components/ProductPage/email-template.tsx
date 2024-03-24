import Image from 'next/image';
import React from 'react';

export default function EmailTemplate({
  senderEmail,
  price,
  productName,
  productImage
}: {
  senderEmail: string;
  price: number;
  productName: string;
  productImage: string;
}) {
  return (
    <div className="bg-gray-100 p-6 max-w-xl mx-auto rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-6">{"New Bid on Your Product!"}</h2>
      <div className="text-center mb-6 w-full h-[100px]">
        <Image fill src={productImage} alt={productName} className="max-w-full h-auto rounded-lg" />
      </div>
      <p className="text-gray-700 text-lg mb-4">{"Hello there,"}</p>
      <p className="text-gray-700 text-lg mb-4">{"You have received a new bid on your product"} <strong>{productName}</strong>{". Here are the details:"}</p>
      <ul className="text-gray-700 text-lg mb-6 list-disc pl-8">
        <li><strong>{"Sender's Email:"}</strong> {senderEmail}</li>
        <li><strong>{"Price:"}</strong> ${price.toFixed(2)}</li>
      </ul>
      <div className="text-center mb-6">
        <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg text-center inline-block">{"View Product"}</a>
      </div>
      <p className="text-gray-700 text-lg">{"Thank you for using our platform!"}</p>
    </div>
  );
}
