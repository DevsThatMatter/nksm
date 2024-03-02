import { useEffect, useState } from "react"
import { SheetDescription } from "../ui/sheet"

import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from 'sonner'
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
    sellerId: string,
    productId: string
}

export default function BuyerInvites({ userId }: { userId: string }) {
    const [activeInvites, setActiveInvites] = useState<InviteStruct[] | null>(null)

    useEffect(() => {
        async function fetchData() {
            const data = await fecthInvites(userId)
            setActiveInvites(data)
        }
        fetchData()
    }, [userId])
    console.log("hello from invites",activeInvites)

    return (
        <SheetDescription className="mt-4 flex flex-col space-y-4 w-full select-none">
            {activeInvites?.map((invites, i) => (
                invites.buyerDetails.map((buyer, j) => (
                    <section key={buyer.buyerId} className="flex items-center space-x-1 border rounded-lg p-2 dark:shadow-gray-700 shadow-md border-b-transparent hover:border-b-2 hover:border-b-gray-300">
                        <article className="flex flex-1 items-center">
                            <div className="flex-shrink-0 rounded-md overflow-hidden">
                                <Image src={buyer.Avatar} alt={buyer.Phone_Number} width={64} height={64} />
                            </div>
                            <div className="flex-grow flex flex-col ml-3">
                                <h5 className="text-gray-500 dark:text-gray-600 text-sm">
                                    {`For ${invites.productDetails.Product_Name}`}
                                </h5>
                                <h5 className="text-gray-500 dark:text-gray-600 text-sm">
                                    {`By ${buyer.First_Name} ${buyer.Last_Name}`}
                                </h5>
                            </div>
                        </article>
                        <div className="mt-auto">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        type="button"
                                        className="bg-blue-600 hover:bg-blue-600 transition-colors fade-out-0"
                                    >
                                        Accept
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <DialogHeader className="bg-blue-600 text-white py-3 px-4 mt-4 rounded-md">
                                        <DialogTitle className="text-lg font-bold">Lock your deal...</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="py-4 px-6 ">
                                        <h1 className="text-yellow-400 font-semibold md:text-lg">Warning:</h1>
                                        <p>Are you sure you want to accept the invite?</p>
                                    </DialogDescription>
                                    <div className="flex justify-end py-4 px-6">
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                className="mr-2 bg-blue-600 hover:bg-blue-600 text-white"
                                                onClick={() => {
                                                    const prom = acceptTheInvite({ productId: invites.productId, sellerId: invites.sellerId, buyerId: buyer.buyerId });
                                                    toast.promise(prom, {
                                                        loading: 'Accepting...',
                                                        success: () => 'This chat was activated, reload to see changes',
                                                        error: 'Unable to accept the invite'
                                                    });
                                                }}
                                            >
                                                Accept
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
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
                ))
            ))}
        </SheetDescription>

    )
}
