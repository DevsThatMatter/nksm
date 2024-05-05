import { cn } from "@/app/utils";
import {
  fecthInvites,
  getAllUserSentInvites,
} from "@/lib/actions/chat.actions";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../ui/skeleton";
import InviteDisplay from "../displays/invite-display";

export default function InvitePanel({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
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
    <main className="h-full px-4 pt-4">
      {isLoading ? (
        <InvitePanelSkeleton />
      ) : (
        <>
          <section className="flex h-1/2 flex-col space-y-3 overflow-y-auto">
            {data?.map((invite) =>
              invite.buyerDetails.map((buyer, i) => (
                <InviteDisplay
                  key={i}
                  userId={userId}
                  buyer={buyer}
                  product={invite.productDetails}
                  productId={invite.productId}
                  sellerId={invite.sellerId}
                  initPrice={invite.InitPrice}
                />
              )),
            )}
          </section>
          <div className="my-2 flex w-full items-center justify-between">
            <div className="h-1 w-[24%] rounded-full border-b-2 border-b-gray-300" />
            <h1 className="col-span-1 text-center text-xl font-bold">
              Pending Invites
            </h1>
            <div className="h-1 w-[24%] rounded-full border-b-2 border-b-gray-300" />
          </div>
          <section className="mt-4 flex h-1/2 flex-col space-y-3 overflow-y-auto">
            {currentUserSent?.map((invite, i) => (
              <InviteDisplay
                userId={userId}
                key={i}
                seller={{
                  Avatar: invite.Seller.Avatar,
                  Name: invite.Seller.Name,
                }}
                sellerId={""}
                product={{
                  Product_Name: invite.Product.Name,
                  Images: [],
                }}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

const InvitePanelSkeleton = () => {
  return (
    <>
      <section className="flex h-1/2 flex-col space-y-3 overflow-y-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <section
            key={i}
            className={cn(
              "p-2",
              "rounded-lg border",
              "flex space-x-2 bg-muted md:space-x-4",
              "drop-shadow-md",
            )}
          >
            <Skeleton className="size-14 rounded-full" />
            <article className="flex grow flex-col justify-center space-y-1">
              <header className="flex items-center justify-between pl-2">
                <section>
                  <Skeleton className="mb-4 h-6 w-[10rem]" />
                  <Skeleton className="h-4 w-[8rem]" />
                </section>
                <Skeleton className="h-6 w-[rem]" />
              </header>

              <div className="flex space-x-4 pl-2">
                <Skeleton className="h-4 w-[4rem]" />
                <Skeleton className="h-4 w-[4rem]" />
              </div>
            </article>
          </section>
        ))}
      </section>

      <div className="my-2 flex w-full items-center justify-between">
        <div className="h-1 w-[24%] rounded-full border-b-2 border-b-gray-300" />
        <h1 className="col-span-1 text-center text-xl font-bold">
          Pending Invites
        </h1>
        <div className="h-1 w-[24%] rounded-full border-b-2 border-b-gray-300" />
      </div>

      <section className="mt-4 flex h-1/2 flex-col space-y-3 overflow-y-auto">
        {Array.from({ length: 2 }).map((_, i) => (
          <section key={i} className="flex rounded-lg border bg-muted p-2">
            <Skeleton className="size-14 rounded-full" />
            <article className="flex grow flex-col justify-center space-y-1">
              <header className="ml-5 flex items-center justify-between">
                <section>
                  <Skeleton className="my-2 h-6 w-[10rem]" />
                  <Skeleton className="h-4 w-[8rem]" />
                </section>
              </header>
            </article>
          </section>
        ))}
      </section>
    </>
  );
};
