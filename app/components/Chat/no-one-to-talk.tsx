import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/app/utils";

export default function NoOneToTalk({
  endpoint,
}: {
  endpoint: "seller" | "buyer";
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="relative h-1/2 w-full">
        <Image
          src={"/monoUseImages/noWork.png"}
          alt="mono-use"
          layout="fill"
          objectFit="contain"
        />
      </section>
      <section className="flex h-1/2 w-full flex-col items-center justify-center">
        <h3 className="text-3xl text-primary">{"It's quiet here!"}</h3>
        <p className="mt-2 text-sm text-gray-600">
          Why not {endpoint === "seller" ? "sell" : "buy"} something?
        </p>
        <Link
          href={endpoint === "seller" ? "/add-listing" : "/explore-products"}
          className={cn(buttonVariants({ variant: "default" }), "mt-4")}
        >
          {endpoint === "seller" ? "Add Listing" : "Explore Products"}
        </Link>
      </section>
    </main>
  );
}
