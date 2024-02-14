import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";

export default function NoOneToTalk() {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="mb-8">
                <Image
                    src="/monoUseImages/noWork.png"
                    alt="No chats"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl text-gray-800 font-bold mb-2 text-center">
                    No recent discussions!
                </h1>
                <p className="text-lg text-gray-600 mb-6 text-center">
                    It seems like there are no recent discussions at the moment. Why not check out some products?
                </p>
                <SheetClose className={buttonVariants({ variant: "outline" })}>
                    Browse Products
                </SheetClose>
            </div>
        </div>
    );
}
