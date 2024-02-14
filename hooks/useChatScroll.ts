import { useEffect, useState } from "react"

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>,
    bottomRef: React.RefObject<HTMLDivElement>,
    shouldLoadMore: boolean,
    loadMore: () => void,
    count: number
}

export function useChatScroll({
    chatRef, bottomRef, shouldLoadMore, loadMore, count
}: ChatScrollProps) {
    const [hasInit, setHasInit] = useState(false)
    useEffect(() => {
        const topDiv = chatRef?.current
        function handelScroll() {
            const scrollTop = topDiv?.scrollTop
            if (scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }
        }
        top?.addEventListener("scroll", handelScroll)
        return () => {
            topDiv?.removeEventListener("scroll", handelScroll)
        }

    }, [shouldLoadMore, loadMore, chatRef.current])
    useEffect(() => {
        const bottomDiv = bottomRef?.current
        const topDiv = chatRef.current
        function shouldScrollBySelf() {
            if (!hasInit && bottomDiv) {
                setHasInit(true)
                return true
            }
            if (!topDiv) {
                return false
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
            return distanceFromBottom <= 100;
        }
        if (shouldScrollBySelf()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth"
                });
            }, 100);
        }
    }, [bottomRef, chatRef.current, count, hasInit])
}