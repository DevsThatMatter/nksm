import { Types } from "mongoose";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import { Suspense } from "react";

import { AddListing } from "@/app/components/AddListing";
import { Dialog, DialogCloseBtn } from "@/app/components/dialog";
import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import { auth } from "@/auth";
import { Product } from "@/lib/models/product.model";

const EditPage = ({ params: { editId } }: { params: { editId: string } }) => {
  return (
    <Dialog
      className="max-w-lg overflow-auto border focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
      contentClassName="grid gap-4"
      location="center"
      disableClickOutside
    >
      <DialogCloseBtn className="absolute right-4 top-4 rounded-sm" />
      <Suspense
        fallback={<Icons.loading className="mx-auto my-32 animate-spin" />}
        key="wait-for-info"
      >
        <GetEditDetails id={editId} />
      </Suspense>
    </Dialog>
  );
};

const GetEditDetails = async ({ id }: { id: string }) => {
  const userID = (await auth())?.user?.id;
  !userID && redirect("login", RedirectType.replace);
  try {
    const product = (await Product.findOne({
      _id: id,
      Seller: userID,
    }).lean()) as {
      _id: Types.ObjectId;
      Product_Name: string;
      Description: string;
      Price: number;
      Images: string[];
      Condition: string;
      Category: string;
      Total_Quantity_Available: number;
      Negotiable: boolean;
    };
    return !product ? (
      <div className="mx-auto my-32">
        <h3>No Such Product</h3>
        <Button asChild variant="link">
          <Link href="/">Close</Link>
        </Button>
      </div>
    ) : (
      <AddListing
        defaultValues={{
          id: product._id.toString(),
          iname: product.Product_Name,
          description: product.Description,
          price: product.Price,
          images: product.Images,
          condition: product.Condition,
          category: product.Category,
          quantity: product.Total_Quantity_Available,
          negotiate: product.Negotiable,
        }}
      />
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="mx-auto my-32">
        {" "}
        <h3>An Error Occurred</h3>
        <Button asChild variant="link">
          <Link href="/">Close</Link>
        </Button>
      </div>
    );
  }
};
export default EditPage;
