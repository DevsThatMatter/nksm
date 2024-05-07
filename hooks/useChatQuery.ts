import { getMessages } from "@/lib/actions/chat.actions";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ChatQueryProps {
  queryKey: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  currentUser: string;
}

export const useChatQuery = ({
  queryKey,
  sellerId,
  buyerId,
  productId,
  currentUser,
}: ChatQueryProps) => {
  async function fetchMessages({
    pageParam = undefined,
  }: {
    pageParam: undefined | number;
  }) {
    const res = await getMessages({
      sellerId,
      buyerId,
      productId,
      currentUser,
      pageNo: pageParam,
    });
    console.log("messages => ", res.content.messages.length);
    return res;
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage.content?.nextPageNo,
      initialPageParam: undefined,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
