import { cn } from "@/app/utils";
import Image from "next/image";
import React from "react";
import InviteModal from "../modals/invite-modal";

interface UserDetails {
  Avatar: string;
  address: string;
  Name: string;
  Username: string;
}

interface ProductDetails {
  Product_Name: string;
  Images: string[];
}

export interface InviteStruct {
  buyerDetails: (UserDetails & { buyerId: string })[];
  sellerDetails: UserDetails;
  productDetails: ProductDetails;
  sellerId: string;
  productId: string;
  InitPrice: number;
}

export default function InviteDisplay({
  buyer,
  product,
  initPrice,
  sellerId,
  productId,
  seller,
}: {
  productId?: string;
  buyer?: UserDetails & {
    buyerId: string;
  };
  seller?: {
    Avatar: string;
    Name: string;
  };
  sellerId: string;
  product: ProductDetails;
  initPrice?: number;
}) {
  return (
    <section
      className={cn(
        "p-2",
        "rounded-lg border",
        "flex space-x-2 bg-muted md:space-x-4",
        "drop-shadow-md hover:drop-shadow-lg",
        buyer && "cursor-pointer",
      )}
    >
      <Image
        src={(buyer?.Avatar || seller?.Avatar) ?? ""}
        alt={(buyer?.Name || seller?.Name) ?? ""}
        width={100}
        height={100}
        className="h-14 w-14 rounded-full object-cover"
      />
      <article className="flex w-full flex-col space-y-1">
        <header className="flex items-center justify-between">
          <div>
            <h2
              className={cn(
                "line-clamp-1 text-ellipsis",
                "text-lg font-semibold text-foreground",
              )}
            >
              {buyer ? buyer.Username : seller?.Name}
            </h2>
            <h5 className="text-sm">For {product.Product_Name}</h5>
          </div>
          <h2
            className={cn(
              "text-lg font-bold text-foreground",
              !buyer && "hidden",
            )}
          >
            ₹{initPrice}
          </h2>
        </header>
        {buyer && productId && (
          <div className="flex justify-start space-x-4">
            <InviteModal
              endpoint={"Accept"}
              productId={productId}
              sellerId={sellerId}
              buyerId={buyer.buyerId}
            />
            <InviteModal
              endpoint={"Reject"}
              productId={productId}
              sellerId={sellerId}
              buyerId={buyer.buyerId}
            />
          </div>
        )}
      </article>
    </section>
  );
}
