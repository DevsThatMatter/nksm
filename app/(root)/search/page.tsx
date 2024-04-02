import Filter from "@/app/components/Search/Filter";
import LoadMore from "@/app/components/Search/LoadMore";
import SortFilter from "@/app/components/Search/SortFilter";
import { getSearchResults } from "@/lib/actions/products.actions";
import { CategoryEnum, SortBy } from "@/types";
import { redirect } from "next/navigation";

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
    <main className="container m-auto flex justify-center">
      <Filter />
      <section className="w-[80%] pt-4">
        <span className="flex justify-between">
          <p className="mb-4 text-xl font-semibold">
            Showing results for &quot;{q}&quot;
            {selectedCategory ? ` in ${selectedCategory}` : ""}
          </p>
          <SortFilter query={q} sorting={sortBy} category={selectedCategory} />
        </span>
        {result.productsData}
        {result.isNext && <LoadMore key={loadMoreKey} pageSize={pageSize} />}
        <br />
      </section>
    </main>
  );
}
