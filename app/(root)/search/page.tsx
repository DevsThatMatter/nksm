import Filter from "@/app/components/Search/Filter";
import LoadMore from "@/app/components/Search/LoadMore";

import { getSearchResults } from "@/lib/actions/fetchProduct.actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const result = await getSearchResults({
    searchString: searchParams.q || "",
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 5,
    sortOrder: searchParams?.sort === "1" ? 1 : -1,
    sortBy: searchParams?.by === "Price" ? "Price" : "createdAt",
    category: searchParams?.category,
  });

  return (
    <main className=" flex justify-center w-full">
      <div className="max-w-screen-md">
        <Filter />
        <p className="text-xl font-semibold mb-4">
          Showing {result.skipAmount + 1}
          {result.skipAmount + result.productsCount} of
          {result.totalProductsCount} results for{" "}
          {`"${searchParams.q}"` || "All"}
          {searchParams.category ? ` in ${searchParams.category}` : ""}
        </p>

        {result.productsData}
        {result.isNext && <LoadMore />}
      </div>
    </main>
  );
}
