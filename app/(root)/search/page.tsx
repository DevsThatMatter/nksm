import Filter from "@/app/components/Search/Filter";
import LoadMore from "@/app/components/Search/LoadMore";
import SortFilter from "@/app/components/Search/SortFilter";
import { getSearchResults } from "@/lib/actions/products.actions";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(searchParams.q || searchParams.category)) {
    redirect("/");
  }
  const pageSize = 5;
  const result = await getSearchResults({
    searchString: searchParams.q || "",
    pageNumber: 1,
    pageSize: pageSize,
    sortOrder: searchParams?.sort === "1" ? 1 : -1,
    sortBy: searchParams?.by === "Price" ? "Price" : "createdAt",
    category: searchParams?.category,
  });
  const loadMoreKey = JSON.stringify(searchParams);

  return (
    <main className="container m-auto flex justify-center">
      <Filter />
      <div className="w-[80%] pt-4">
        <p className="mb-4 text-xl font-semibold">
          Showing results for &quot;{searchParams.q || "All"}&quot;
          {searchParams.category ? ` in ${searchParams.category}` : ""}
        </p>
        <SortFilter q={searchParams?.q!} />
        {result.productsData}
        {result.isNext && <LoadMore key={loadMoreKey} pageSize={pageSize} />}
        <br />
      </div>
    </main>
  );
}
