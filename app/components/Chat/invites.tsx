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
import { cn } from "@/app/utils";

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
    <div className="mt-4 flex h-[93%] w-full select-none flex-col space-y-4 px-6">
      <section className="h-1/2 space-y-2 overflow-y-auto">
        {data?.map((invites, i) =>
          invites.buyerDetails.map((buyer, j) => (
            <section
              key={j}
              className="flex flex-col rounded-lg border bg-muted p-2 drop-shadow-md hover:drop-shadow-lg"
            >
              <div className="flex items-center justify-between p-2 ">
                <div className="flex items-center space-x-4 ">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={buyer.Avatar}
                      alt={buyer.Username}
                      fill
                      className="h-16 w-16 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="line-clamp-1 text-ellipsis text-lg font-semibold text-black dark:text-white">
                      {`${buyer.Name}`}
                    </h1>
                    <h5 className="line-clamp-1 text-sm text-gray-600 dark:text-gray-100">
                      {`For ${invites.productDetails.Product_Name}`}
                    </h5>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-black dark:text-white">
                  ₹400
                </h2>
              </div>
              <div className="ml-[18%] flex md:ml-[17%]">
                <Dialog>
                  <DialogTitle className="ml-4">
                    <div className="flex space-x-4">
                      <DialogTrigger asChild>
                        <button
                          className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                          onClick={() => {
                            setSellectedButton("accept");
                          }}
                        >
                          Accept
                        </button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <button
                          className="rounded-lg bg-red-100 px-4 py-1 text-sm text-red-500 hover:text-red-600  dark:bg-background/20"
                          onClick={() => {
                            setSellectedButton("reject");
                          }}
                        >
                          Reject
                        </button>
                      </DialogTrigger>
                    </div>
                  </DialogTitle>
                  <DialogContent className="rounded-lg bg-muted shadow-lg">
                    <DialogHeader
                      className={cn(
                        "rounded-t-lg",
                        selectedButton === "reject"
                          ? "bg-red-600"
                          : "bg-blue-600",
                        "px-4 py-3",
                        "text-white",
                      )}
                    >
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
                          <h1 className="text-foreground">
                            This invite will be accepted, and you will be able
                            to proceed chatting.
                          </h1>
                        ) : (
                          <h1 className="text-foreground">
                            Are you sure you want to reject this invite?
                          </h1>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end px-6 py-3">
                      <DialogClose asChild>
                        <Button
                          className={cn(
                            "mr-2",
                            selectedButton === "reject"
                              ? "bg-red-600 hover:bg-red-600"
                              : "bg-blue-600",
                            "",
                          )}
                          onClick={() => {
                            const prom = acceptTheInvite({
                              productId: invites.productId,
                              sellerId: invites.sellerId,
                              buyerId: buyer.buyerId,
                              caller:
                                selectedButton === "accept"
                                  ? "accept"
                                  : "reject",
                            });
                            toast.promise(prom, {
                              loading:
                                selectedButton === "accept"
                                  ? "Accepting..."
                                  : "Rejecting...",
                              success:
                                selectedButton === "accept"
                                  ? "Invite accepted."
                                  : "Invite rejected",
                              error:
                                selectedButton === "accept"
                                  ? "Unable to accept the invite."
                                  : "Unable to reject the invite.",
                            });
                          }}
                        >
                          {selectedButton === "accept" ? "Accept" : "Reject"}
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          className="border border-red-500 bg-transparent text-red-400 hover:bg-transparent"
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
        <div className="h-1 w-20 rounded-full border-b-2 border-b-gray-300" />
        <h1 className="col-span-1 text-center text-xl font-bold">
          Pending Invites
        </h1>
        <div className="h-1 w-20 rounded-full border-b-2 border-b-gray-300" />
      </div>
      <section className="h-1/2 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {currentUserSent?.map((invites, idx) => (
            <div
              key={idx}
              className="flex h-[80px] cursor-not-allowed items-center space-x-4 rounded-lg border bg-muted p-2 opacity-70 drop-shadow-md hover:drop-shadow-lg"
            >
              <div className="flex-shrink-0">
                <Image
                  src={invites.Seller.Avatar}
                  alt={invites.Seller.Name ?? invites.Product.Name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground">
                  {invites.Seller.Name ?? "Moni chan"}
                </h1>
                <h4 className="text-sm text-muted-foreground">
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
