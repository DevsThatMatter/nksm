import Filter from "@/app/components/Search/Filter";
import LoadMore from "@/app/components/Search/LoadMore";
import SearchShell from "@/app/components/Search/SearchShell";

import { getSearchResults } from "@/lib/actions/fetchProduct.actions";
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
    <main className="m-auto max-w-screen-md">
      <Filter />

      <p className="mb-4 text-xl font-semibold">
        Showing results for &quot;{searchParams.q || "All"}&quot;
        {searchParams.category ? ` in ${searchParams.category}` : ""}
      </p>
      <SearchShell>
        {result.productsData}
        {result.isNext && <LoadMore key={loadMoreKey} pageSize={pageSize} />}
      </SearchShell>
      <br />
    </main>
  );
}
