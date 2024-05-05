import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SearchSkeleton = () => {
  return (
    <Card className="my-4">
      <CardContent className="container relative flex flex-col items-start gap-6 p-3 sm:h-64 sm:flex-row sm:p-6">
        <div className="relative aspect-square h-full max-sm:w-full">
          <Skeleton className="h-full w-full rounded-lg border border-gray-200 object-cover dark:border-gray-800" />
        </div>
        <div className="grid grow gap-2 text-base max-sm:w-full sm:max-w-[calc(100%-16rem)]">
          <h2 className="w-24 animate-pulse whitespace-pre rounded-md bg-primary/10 font-extrabold leading-tight md:text-xl">
            {" "}
          </h2>
          <p className="w-full animate-pulse whitespace-pre bg-primary/10 text-base leading-normal">
            {" "}
          </p>
          <p className="w-full animate-pulse whitespace-pre bg-primary/10 text-base leading-normal">
            {" "}
          </p>
          <p className="w-full animate-pulse whitespace-pre bg-primary/10 text-base leading-normal">
            {" "}
          </p>
          <div className="flex items-center gap-2">
            <p className="my-1 w-[4.5rem] animate-pulse whitespace-pre rounded-2xl border border-muted-foreground bg-primary/10 p-1 px-2 text-xs">
              {"  "}
            </p>
            <p className="w-[4.5rem] animate-pulse whitespace-pre rounded-3xl bg-primary/10 p-1 px-2 text-xs max-sm:absolute max-sm:left-0 max-sm:top-0 max-sm:ml-4 max-sm:mt-4">
              {" "}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-10 animate-pulse whitespace-pre rounded-md bg-primary/10 text-xl font-bold">
              {" "}
            </h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSkeleton;
