import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const CommentSkeleton = () => {
  return (
    <>
      <h2 className="mt-6 pb-3 text-2xl font-semibold lg:mt-3 lg:pb-0 lg:text-xl">
        Comments
      </h2>
      <ScrollArea className="mt-2 flex h-72 w-full rounded-md border px-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex items-start space-x-2 py-2" key={index}>
            <Skeleton className="size-10 rounded-full" />
            <div>
              <Skeleton className="mb-2 h-5 w-[10rem]" />
              <Skeleton className="h-4 w-[14rem]" />
            </div>
          </div>
        ))}
      </ScrollArea>
      <Input
        className="w-full rounded-md border p-2 focus-visible:outline-none focus-visible:ring-0"
        id="comment-input"
        placeholder="Ask about the product"
        name="content"
        required
        disabled
      />
    </>
  );
};
export default CommentSkeleton;
