import { chatDetails } from "@/types";

export function getChatDetails({
  userId,
  activeDiscussion,
  discussion,
}: {
  userId: string;
  activeDiscussion?: chatDetails | null;
  discussion?: chatDetails;
}) {
  const otherUserId =
    activeDiscussion?.buyerDetails.id === userId
      ? activeDiscussion.sellerDetails.id
      : activeDiscussion?.buyerDetails.id;
  const otherUserName =
    activeDiscussion?.buyerDetails.id === userId
      ? activeDiscussion.sellerDetails.Name
      : activeDiscussion?.buyerDetails.Name;
  const otherUserAvatar =
    activeDiscussion?.buyerDetails.id === userId
      ? activeDiscussion.sellerDetails.Avatar
      : activeDiscussion?.buyerDetails.Avatar;

  const queryKey = `chat${activeDiscussion?.productDetails.productId}productId${activeDiscussion?.productDetails.productId}sellerId${activeDiscussion?.sellerDetails.id}buyerId${activeDiscussion?.buyerDetails.id}query`;
  const addKey = `chat${activeDiscussion?.productDetails.productId}productId${activeDiscussion?.productDetails.productId}sellerId${activeDiscussion?.sellerDetails.id}buyerId${activeDiscussion?.buyerDetails.id}add`;
  const updateKey = `chat${activeDiscussion?.productDetails.productId}productId${activeDiscussion?.productDetails.productId}sellerId${activeDiscussion?.sellerDetails.id}buyerId${activeDiscussion?.buyerDetails.id}update`;

  const otherUserDetails = {
    id: otherUserId ?? "",
    name: otherUserName ?? "",
    avatar: otherUserAvatar ?? "",
    queryKey: queryKey,
  };
  const displayAvatar =
    discussion?.buyerDetails.id === userId
      ? discussion?.sellerDetails.Avatar
      : discussion?.buyerDetails.Avatar;
  const displayName =
    discussion?.buyerDetails.id === userId
      ? discussion?.sellerDetails.Name
      : discussion?.buyerDetails.Name;
  return {
    otherUserDetails,
    activeDiscussion,
    queryKey,
    addKey,
    updateKey,
    displayAvatar,
    displayName,
  };
}
