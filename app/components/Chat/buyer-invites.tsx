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

  useEffect(() => {
    async function fetchData() {
      const data = await fecthInvites(userId);
      setActiveInvites(data);
    }
    fetchData();
  }, [userId]);
  console.log("hello from invites", activeInvites);

  return (
    <SheetDescription className="mt-4 flex w-full select-none flex-col space-y-4">
      {activeInvites?.map((invites, i) =>
        invites.buyerDetails.map((buyer, j) => (
          <section
            key={buyer.buyerId}
            className="flex items-center space-x-1 rounded-lg border border-b-transparent p-2 shadow-md hover:border-b-2 hover:border-b-gray-300 dark:shadow-gray-700"
          >
            <article className="flex flex-1 items-center">
              <div className="flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={buyer.Avatar}
                  alt={buyer.Phone_Number}
                  width={64}
                  height={64}
                />
              </div>
              <div className="ml-3 flex flex-grow flex-col">
                <h5 className="text-sm text-gray-500 dark:text-gray-600">
                  {`For ${invites.productDetails.Product_Name}`}
                </h5>
                <h5 className="text-sm text-gray-500 dark:text-gray-600">
                  {`By ${buyer.First_Name} ${buyer.Last_Name}`}
                </h5>
              </div>
            </article>
            <div className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="bg-blue-600 transition-colors fade-out-0 hover:bg-blue-600"
                  >
                    Accept
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-hidden rounded-lg bg-white shadow-lg">
                  <DialogHeader className="mt-4 rounded-md bg-blue-600 px-4 py-3 text-white">
                    <DialogTitle className="text-lg font-bold">
                      Lock your deal...
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="px-6 py-4 ">
                    <h1 className="font-semibold text-yellow-400 md:text-lg">
                      Warning:
                    </h1>
                    <p>Are you sure you want to accept the invite?</p>
                  </DialogDescription>
                  <div className="flex justify-end px-6 py-4">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="mr-2 bg-blue-600 text-white hover:bg-blue-600"
                        onClick={() => {
                          const prom = acceptTheInvite({
                            productId: invites.productId,
                            sellerId: invites.sellerId,
                            buyerId: buyer.buyerId,
                          });
                          toast.promise(prom, {
                            loading: "Accepting...",
                            success: () =>
                              "This chat was activated, reload to see changes",
                            error: "Unable to accept the invite",
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
    </SheetDescription>
  );
}
