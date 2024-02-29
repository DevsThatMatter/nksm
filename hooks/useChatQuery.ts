import { getInitialMessages } from "@/lib/actions/chat.actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";

interface ChatQueryProps {
  queryKey: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  currentUser: string;
  pageNo: number;
}

export const useChatQuery = ({
  queryKey,
  sellerId,
  buyerId,
  productId,
  currentUser,
}: ChatQueryProps) => {


  async function fetchMessages({ pageParam = 0 }) {
    const res = await getInitialMessages({ sellerId, buyerId, productId, currentUser, pageNo: pageParam })
    return res
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
