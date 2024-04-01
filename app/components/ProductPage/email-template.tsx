import React from "react";

export default function EmailTemplate({
  senderEmail,
  price,
  productName,
  productImages,
}: {
  senderEmail: string;
  price: number;
  productName: string;
  productImages: string[];
}) {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Template</title>
      <link rel="stylesheet" href="styles.css" />
      <div id="root" />
    </>
  );
}
