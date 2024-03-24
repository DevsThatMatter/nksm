import { useEffect, useState } from "react";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  acceptTheInvite,
  fecthInvites,
  getAllUserSentInvites,
} from "@/lib/actions/chat.actions";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";

interface UserDetails {
  Avatar: string;
  address: string;
  Last_Name: string;
  First_Name: string;
  Phone_Number: string;
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
}

export default function BuyerInvites({ userId }: { userId: string }) {
  const [selectedButton, setSellectedButton] = useState<
    "accept" | "reject" | null
  >(null);

  const { data } = useQuery({
    queryKey: ["user-recived-invites", userId],
    queryFn: () => fecthInvites(userId),
    enabled: userId !== undefined,
  });
  const currentUserSent = useQuery({
    queryKey: ["user-sent-invites", userId],
    queryFn: () => getAllUserSentInvites(userId),
    enabled: userId !== undefined,
  }).data;

  return (
    <div className="mt-4 flex h-[93%] w-full select-none flex-col space-y-4">
      <section className="h-1/2 space-y-2 overflow-y-auto">
        {data?.map((invites, i) =>
          invites.buyerDetails.map((buyer, j) => (
            <section
              key={j}
              className="flex h-[130px] flex-col rounded-lg shadow-md hover:shadow-lg dark:bg-[#323741]"
            >
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={buyer.Avatar}
                      alt={buyer.Phone_Number}
                      width={50}
                      height={50}
                      className="h-16 w-16 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-black dark:text-gray-300">
                      {`${buyer.First_Name} ${buyer.Last_Name}`}
                    </h1>
                    <h5 className="text-sm text-gray-600 dark:text-gray-400">
                      {`For ${invites.productDetails.Product_Name}`}
                    </h5>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-black">$400</h2>
              </div>
              <div className="flex justify-center p-1">
                <Dialog>
                  <DialogTitle className="ml-4">
                    <div className="flex space-x-4">
                      <DialogTrigger asChild>
                        <Button
                          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                          onClick={() => setSellectedButton("accept")}
                        >
                          Accept
                        </Button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="rounded-md bg-red-200 px-3 py-1 text-sm text-red-500 hover:bg-red-300 hover:text-red-600"
                          onClick={() => setSellectedButton("reject")}
                        >
                          Reject
                        </Button>
                      </DialogTrigger>
                    </div>
                  </DialogTitle>
                  <DialogContent className="rounded-lg bg-white shadow-lg">
                    <DialogHeader className="rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                      <DialogTitle className="text-lg font-bold">
                        {selectedButton === "reject"
                          ? "Reject this invite?"
                          : "Accept this invite?"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="px-6 py-2">
                      <h1 className="font-semibold text-yellow-400 md:text-lg">
                        Warning:
                      </h1>
                      <div>
                        {selectedButton === "accept" ? (
                          <h1 className="dark:gray-200 text-gray-600">
                            This invite will be accepted, and you will be able
                            to proceed chatting.
                          </h1>
                        ) : (
                          <h1 className="dark:gray-200 text-gray-600">
                            Are you sure you want to reject this invite?
                          </h1>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end px-6 py-3">
                      <DialogClose asChild>
                        <Button
                          className="mr-2 bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => {
                            const prom = acceptTheInvite({
                              productId: invites.productId,
                              sellerId: invites.sellerId,
                              buyerId: buyer.buyerId,
                              caller: "accept",
                            });
                            toast.promise(prom, {
                              loading: "Accepting...",
                              success: "Invite accepted.",
                              error: "Unable to accept the invite.",
                            });
                          }}
                        >
                          Accept
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                          onClick={() => toast.info("No changes made")}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </section>
          )),
        )}
      </section>

      <div className="flex w-full items-center justify-between">
        <div className="h-1 w-24 rounded-full border-b-2 border-b-gray-300" />
        <h1 className="col-span-1 text-center md:text-lg">Pending Invites</h1>
        <div className="h-1 w-24 rounded-full border-b-2 border-b-gray-300" />
      </div>
      <section className="h-1/2 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {currentUserSent?.map((invites, idx) => (
            <div
              key={idx}
              className="flex h-[80px] items-center space-x-4 rounded-lg p-2 shadow-md dark:bg-[#323741] dark:shadow-gray-700"
            >
              <div className="flex-shrink-0">
                <Image
                  src={invites.Seller.Avatar}
                  alt={invites.Seller.Name ?? invites.Product.Name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground">
                  {invites.Seller.Name ?? "Moni"}
                </h1>
                <h4 className="text-sm text-gray-400">
                  {invites.Product.Name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
