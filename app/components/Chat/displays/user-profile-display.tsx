import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "../../../../hooks/useChatStore";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import DeleteChat from "../modals/delete-chat-modal";

interface userProfileProps {
  id: string;
  name: string;
  avatar: string;
  queryKey: string;
  rollNo: string;
}

export default function UserProfile({
  otherUserDetails,
}: {
  otherUserDetails: userProfileProps;
}) {
  const { removeActiveDiscussion, activeDiscussion } = useChatStore();
  const queryClient = useQueryClient();

  return (
    <header
      className={cn(
        "bg-muted py-3 pl-2",
        "flex w-full items-center justify-between shadow-sm",
      )}
    >
      <section className="flex items-center space-x-3 ">
        <button
          className="rounded-full"
          onClick={() => {
            removeActiveDiscussion();
            queryClient.invalidateQueries({
              queryKey: [otherUserDetails.queryKey],
            });
          }}
        >
          <Icons.moveback className="h-6 w-6" />
        </button>
        <Avatar>
          <AvatarImage src={otherUserDetails.avatar} />
          <AvatarFallback>
            {otherUserDetails.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <section className="flex flex-col justify-start">
          <h3 className="font-semibold text-foreground">
            {otherUserDetails.name}
          </h3>
          <h6 className="text-sm text-muted-foreground">
            {otherUserDetails.rollNo}
          </h6>
        </section>
      </section>
      <DeleteChat
        Seller={activeDiscussion?.sellerDetails.id ?? ""}
        Buyer={activeDiscussion?.buyerDetails.id ?? ""}
        ProductId={activeDiscussion?.productDetails.productId ?? ""}
      />
    </header>
  );
}
