import { cn } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function NoOneToTalk({
  endpoint,
}: {
  endpoint: "seller" | "buyer";
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="relative h-1/2 w-full">
        <Image
          src={
            "https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/monoUseImages%2FnoWork.png"
          }
          alt="mono-use"
          layout="fill"
          objectFit="contain"
        />
      </section>
      <section className="flex h-1/2 w-full flex-col items-center justify-center">
        <h3 className="text-3xl text-primary">{"It's Quiet Here!"}</h3>
        <p className="mt-2 text-sm text-gray-600">
          Why not {endpoint === "seller" ? "sell" : "buy"} something?
        </p>
        {endpoint === "seller" && (
          <Link
            href={endpoint === "seller" ? "/add-listing" : "/explore-products"}
            className={cn(buttonVariants({ variant: "default" }), "mt-4")}
          >
            Add a product
          </Link>
        )}
      </section>
    </main>
  );
}
