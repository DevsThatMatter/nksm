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
  const result = await getSearchResults({
    searchString: searchParams.q || "",
    pageNumber: 1,
    pageSize: 5,
    sortOrder: searchParams?.sort === "1" ? 1 : -1,
    sortBy: searchParams?.by === "Price" ? "Price" : "createdAt",
    category: searchParams?.category,
  });

  return (
    <main className="m-auto max-w-screen-md">
      <Filter />

      <p className="mb-4 text-xl font-semibold">
        Showing results for &quot;{searchParams.q || "All"}&quot;
        {searchParams.category ? ` in ${searchParams.category}` : ""}
      </p>
      <SearchShell>
        {result.productsData}
        {result.isNext && <LoadMore pages={2} />}
      </SearchShell>
      <br />
    </main>
  );
}
