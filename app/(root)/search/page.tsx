import Filter from "@/app/components/Search/Filter";
import LoadMore from "@/app/components/Search/LoadMore";
import SortFilter from "@/app/components/Search/SortFilter";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { getSearchResults } from "@/lib/actions/products.actions";
import { CategoryEnum, SortBy } from "@/types";
import { redirect } from "next/navigation";

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
    category?: CategoryEnum;
    sortBy?: SortBy;
  };
}) {
  if (!q) {
    redirect("/");
  }
  const selectedCategory = (
    category && Object.values(CategoryEnum).includes(category)
      ? category
      : undefined
  ) as CategoryEnum | undefined;
  console.log(selectedCategory);
  const pageSize = 5;
  const result = await getSearchResults({
    searchString: q,
    pageNumber: 1,
    pageSize: pageSize,
    category: selectedCategory,
    sortBy: sortBy,
  });
  const loadMoreKey = JSON.stringify(q + category + sortBy);

  return (
    <main className="container m-auto flex justify-center max-sm:px-2 sm:gap-x-10">
      <Filter query={q} sorting={sortBy} category={selectedCategory} />
      <section className="w-[80%] pt-4">
        <span className="flex flex-wrap justify-between">
          <p className="mb-2 pl-1 text-xl font-semibold">
            Showing results for &quot;{q}&quot;
            {selectedCategory ? ` in ${selectedCategory}` : ""}
          </p>
          <SortFilter query={q} sorting={sortBy} category={selectedCategory} />
        </span>
        <ScrollArea>
          {result.productsData}
          {result.isNext && <LoadMore key={loadMoreKey} pageSize={pageSize} />}
          <br />
        </ScrollArea>
      </section>
    </main>
  );
}
