import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/app/components/providers/socket-provider";
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
  const { isConnected } = useSocket();

  async function fetchMessages({ pageParam = undefined }) {
    const url = qs.stringifyUrl({
      url: "/api/messages",
      query: {
        pageNo: pageParam,
        sellerId,
        buyerId,
        productId,
        currentUser,
      },
    });
    const res = await fetch(url);
    return res.json();
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage.nextPageNo,
      refetchInterval:  1000, // currently its polling but I am facing an erorr soon I will change
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
