import React from "react";

export default function EmailTemplate({
  senderEmail,
  price,
  productName,
  productImage,
}: {
  senderEmail: string;
  price: number;
  productName: string;
  productImage: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-lg bg-gray-100 p-6 shadow-md">
      <h2 className="mb-6 text-center text-xl font-semibold">
        {"New Bid on Your Product!"}
      </h2>
      <div className="mb-6 h-[100px] w-full text-center">
        <img
          src={productImage}
          alt={productName}
          className="h-auto max-w-full rounded-lg"
        />
      </div>
      <p className="mb-4 text-lg text-gray-700">{"Hello there,"}</p>
      <p className="mb-4 text-lg text-gray-700">
        {"You have received a new bid on your product"}{" "}
        <strong>{productName}</strong>
        {". Here are the details:"}
      </p>
      <ul className="mb-6 list-disc pl-8 text-lg text-gray-700">
        <li>
          <strong>{"Sender's Email:"}</strong> {senderEmail}
        </li>
        <li>
          <strong>{"Price:"}</strong> ${price.toFixed(2)}
        </li>
      </ul>
      <div className="mb-6 text-center">
        <a
          href="#"
          className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-center text-lg text-white hover:bg-blue-600"
        >
          {"View Product"}
        </a>
      </div>
      <p className="text-lg text-gray-700">
        {"Thank you for using our platform!"}
      </p>
    </div>
  );
}
