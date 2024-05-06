import Filter from "@/app/components/Search/Filter";
import LoadMore from "@/app/components/Search/LoadMore";
import SearchSkeleton from "@/app/components/Search/SearchSkeleton";
import SortFilter, {
  sortFilterObject,
} from "@/app/components/Search/SortFilter";
import { getSearchResults } from "@/lib/actions/products.actions";
import { CategoryEnum, SortBy } from "@/types";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export interface FilterProps {
  query: string;
  sorting?: SortBy;
  category?: keyof typeof CategoryEnum;
}

export default async function Page({
  searchParams: { q, category, sortBy },
}: {
  searchParams: {
    q: string;
    category?: keyof typeof CategoryEnum;
    sortBy?: SortBy;
  };
}) {
  if (!q) {
    redirect("/");
  }
  const selectedCategory =
    category && Object.keys(CategoryEnum).includes(category)
      ? category
      : undefined;
  const selectedSorting =
    sortBy && Object.keys(sortFilterObject).includes(sortBy)
      ? sortBy
      : "newest";
  console.log(selectedCategory);
  const pageSize = 6;
  const result = await getSearchResults({
    searchString: q,
    pageNumber: 1,
    pageSize: pageSize,
    category: selectedCategory,
    sortBy: selectedSorting,
  });
  const loadMoreKey = JSON.stringify(
    q + selectedCategory ?? "" + selectedSorting ?? "",
  );
  return (
    <section className="container m-auto grid grid-cols-1 justify-center gap-x-1 px-2 sm:gap-x-[1%] sm:px-3 lg:grid-cols-[15rem_calc(100%-15rem)] xl:grid-cols-[20%_80%]">
      <Filter query={q} sorting={selectedSorting} category={selectedCategory} />

      <section className="rounded-sm max-lg:w-full">
        <span className="sticky top-[4.769rem] z-10 flex flex-wrap items-center justify-between bg-background p-2">
          <p className="max-w-[65%] pl-1 text-xl font-semibold max-md:text-sm max-[430px]:text-xs">
            Showing results for &quot;{q}&quot;
            {selectedCategory ? ` in ${selectedCategory}` : ""}
          </p>
          <SortFilter
            query={q}
            sorting={selectedSorting}
            category={selectedCategory}
          />
        </span>
        <Suspense
          fallback={[...Array(5)].map((_, i) => (
            <SearchSkeleton key={i} />
          ))}
          key="search"
        >
          <DisplayResults
            query={q}
            sorting={selectedSorting}
            category={selectedCategory}
          />
        </Suspense>
      </section>
    </section>
  );
}

const DisplayResults = async ({ query, sorting, category }: FilterProps) => {
  const pageSize = 5;
  const result = await getSearchResults({
    searchString: query,
    pageNumber: 1,
    pageSize: pageSize,
    category: category,
    sortBy: sorting,
  });
  const loadMoreKey = JSON.stringify(query + category ?? "" + sorting ?? "");
  return (
    <>
      {result.productsData.length === 0 ? (
        <div className="grid h-[34rem] place-content-center px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-foreground">404</h1>
            <p className="text-2xl font-bold tracking-tight text-muted-foreground sm:text-4xl">
              Uh-oh!
            </p>
            <p className="mt-4 text-gray-500">No Results Found!</p>
          </div>
        </div>
      ) : (
        result.productsData
      )}
      {result.isNext && (
        <LoadMore
          sorting={sorting}
          category={category}
          query={query}
          pageSize={pageSize}
          key={loadMoreKey}
        />
      )}
      <br />
    </>
  );
};
