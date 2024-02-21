import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/app/components/providers/socketProvider";
import { getMessages } from "@/lib/actions/chat.actions";


interface ChatQueryProps {
    queryKey: string;
    sellerId: string,
    buyerId: string,
    productId: string,
    currentUser: string,
    pageNo: number
}

export const useChatQuery = ({
    queryKey, sellerId, buyerId, productId, currentUser, pageNo
}: ChatQueryProps) => {
    const { isConnected } = useSocket();

    async function fetchMessages(){
        const res = await getMessages({ sellerId, buyerId, productId, currentUser, pageNo });
        return res;
    }


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextPageNo,
        refetchInterval: 1000, // currently its polling but I am facing an erorr soon I will change
        initialPageParam: undefined
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
}