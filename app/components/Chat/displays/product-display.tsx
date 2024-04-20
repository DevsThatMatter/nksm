import { cn } from "@/app/utils";
import { Icons } from "@/app/utils/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/actions/products.actions";
import { useChatStore } from "../../../../hooks/useChatStore";
import { Suspense } from "react";
import { Skeleton } from "../../ui/skeleton";

export default function ProductDisplay({ productId }: { productId: string }) {
  const { data } = useQuery({
    queryKey: ["fetch-product-by-id", productId],
    queryFn: () => getProductById({ productId: productId }),
  });

  const { removeDiscussionGroup } = useChatStore();

  return (
    <header
      className={cn(
        "sticky mt-2 bg-muted py-3 pl-2",
        "w-full shadow-sm",
        "flex items-center space-x-3",
      )}
    >
      <button className="rounded-full" onClick={() => removeDiscussionGroup()}>
        <Icons.moveback className="h-6 w-6" />
      </button>
      <Avatar>
        <AvatarImage src={data?.Images[0]} />
        <AvatarFallback>
          {data?.Product_Name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <section className="flex flex-col justify-start">
        <h3 className="font-semibold text-foreground">{data?.Product_Name}</h3>
        <Suspense fallback={<Skeleton className="h-3 w-[80%]" />}>
          <h6 className="line-clamp-1 text-ellipsis text-sm text-muted-foreground">
            {data?.Description}
          </h6>
        </Suspense>
      </section>
    </header>
  );
}
