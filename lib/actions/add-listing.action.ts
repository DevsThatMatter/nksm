"use server";

type formData = {
  iname: string;
  condition: string;
  description: string;
  category: string;
  price: number | "";
  quantity: number | "";
  imageArray: [];
};
export async function addProductFromListing(values: formData) {
  console.log(values);
}
