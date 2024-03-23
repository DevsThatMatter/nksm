import React from "react";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";

export default function NoOneToTalk() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src="/monoUseImages/noWork.png"
        alt="No chats"
        width={300}
        height={300}
      />

      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          No recent discussions!
        </h1>
        <p className="mb-6 text-center text-lg text-gray-600">
          It seems like there are no recent discussions at the moment. Why not
          check out some products?
        </p>
        <SheetClose className={buttonVariants({ variant: "outline" })}>
          <Link href={"/"}>Browse Products</Link>
        </SheetClose>
      </div>
    </div>
  );
}
