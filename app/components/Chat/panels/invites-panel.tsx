import {
  fecthInvites,
  getAllUserSentInvites,
} from "@/lib/actions/chat.actions";
import { useQuery } from "@tanstack/react-query";
import InviteDisplay from "../displays/invite-display";

export default function InvitePanel({ userId }: { userId: string }) {
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
    <main className="h-full px-4 pt-4">
      <section className="flex h-1/2 flex-col space-y-3 overflow-y-hidden">
        {data?.map((invite) =>
          invite.buyerDetails.map((buyer, i) => (
            <InviteDisplay
              key={i}
              buyer={buyer}
              product={invite.productDetails}
              productId={invite.productId}
              sellerId={invite.sellerId}
              initPrice={invite.InitPrice}
            />
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

      <section className="flex h-1/2 flex-col space-y-3 overflow-y-auto">
        {currentUserSent?.map((invite, i) => (
          <InviteDisplay
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
    </main>
  );
}
