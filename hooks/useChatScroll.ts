import { useEffect, useState } from "react";

type ChatScrollProps = {
  topRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export function useChatScroll({
  topRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) {
  const [hasInit, setHasInit] = useState(false);
  useEffect(() => {
    const topDiv = topRef?.current;
    function handelScroll() {
      const scrollTop = topDiv?.scrollTop;
      console.log(
        "calling handel scroll => ",
        "scrollTop => ",
        scrollTop,
        "shouldLoadMore => ",
        shouldLoadMore,
      );
      if (scrollTop === 0 && shouldLoadMore) {
        console.log("calling the fetch next");
        loadMore();
      }
    }
    topDiv?.addEventListener("scroll", handelScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handelScroll);
    };
  }, [shouldLoadMore, loadMore, topRef]);
  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = topRef.current;
    function shouldScrollBySelf() {
      if (!hasInit && bottomDiv) {
        setHasInit(true);
        return true;
      }
      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    }
    if (shouldScrollBySelf()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, count, hasInit, topRef]);
}
