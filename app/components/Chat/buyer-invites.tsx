import { useEffect, useState } from "react";
import { SheetDescription } from "../ui/sheet";

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
import { acceptTheInvite, fecthInvites } from "@/lib/actions/chat.actions";

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
  const [activeInvites, setActiveInvites] = useState<InviteStruct[] | null>(
    null,
  );

  const [selectedButton, setSellectedButton] = useState<
    "accept" | "reject" | null
  >(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fecthInvites(userId);
      setActiveInvites(data);
    }
    fetchData();
  }, [userId]);

  return (
    <SheetDescription className="mt-4 flex w-full select-none flex-col space-y-4">
      {activeInvites?.map((invites, i) =>
        invites.buyerDetails.map((buyer, j) => (
          <section
            key={buyer.buyerId}
            className="flex flex-col space-x-1 rounded-lg border border-b-transparent p-2 shadow-md hover:border-b-2 hover:border-b-gray-300 dark:shadow-gray-700"
          >
            <article className="flex space-x-2 rounded-md">
              <div className="flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={buyer.Avatar}
                  alt={buyer.Phone_Number}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-cover"
                />
              </div>
              <div className="flex w-full space-x-5">
                <div className="flex flex-grow flex-col">
                  <h1 className="text-xl font-semibold text-black dark:text-gray-300">
                    {`${buyer.First_Name} ${buyer.Last_Name}`}
                  </h1>
                  <h5 className="text-sm text-gray-600 dark:text-gray-400">
                    {`For ${invites.productDetails.Product_Name}`}
                  </h5>
                </div>
                <h2 className="mt-2 text-xl font-bold text-black">$400</h2>
              </div>
            </article>
            <div>
              <Dialog>
                <DialogTitle className="ml-[5dvw]">
                  <div className="flex space-x-5 ">
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => setSellectedButton("accept")}
                      >
                        Accept
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-lg bg-red-200 text-red-500 hover:bg-red-300 hover:text-red-600"
                        onClick={() => setSellectedButton("reject")}
                      >
                        Reject
                      </Button>
                    </DialogTrigger>
                  </div>
                </DialogTitle>
                <DialogContent className="overflow-hidden rounded-lg bg-white shadow-lg">
                  <DialogHeader className="mt-4 rounded-t-lg bg-blue-600 px-4 py-3 text-white">
                    <DialogTitle className="text-lg font-bold">
                      {selectedButton === "reject"
                        ? "Are you sure you want to reject this invite?"
                        : "Are you sure you want to accept this invite?"}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="px-6 py-4">
                    <h1 className="font-semibold text-yellow-400 md:text-lg">
                      Warning:
                    </h1>
                    <div>
                      {selectedButton === "accept" ? (
                        <h1>
                          This invite will be accepted after this, and you will
                          be able proceed chating
                        </h1>
                      ) : (
                        <h1>Are you sure you want to reject this invite</h1>
                      )}
                    </div>
                  </DialogDescription>
                  <div className="flex justify-end px-6 py-4">
                    <DialogClose asChild>
                      {selectedButton === "accept" ? (
                        <Button
                          type="button"
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
                              success:
                                "This invite was activated, reload to see changes",
                              error: "Unable to accept the invite",
                            });
                          }}
                        >
                          Accept
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="mr-2 bg-red-600 text-white hover:bg-red-700"
                          onClick={() => {
                            const prom = acceptTheInvite({
                              productId: invites.productId,
                              sellerId: invites.sellerId,
                              buyerId: buyer.buyerId,
                              caller: "reject",
                            });
                            toast.promise(prom, {
                              loading: "Rejecting...",
                              success:
                                "This invite was rejected, reload to see changes",
                              error: "Unable to reject the invite",
                            });
                          }}
                        >
                          Reject
                        </Button>
                      )}
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
    </SheetDescription>
  );
}
