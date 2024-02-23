import Filter from "@/app/components/Search/Filter";
import SearchCard from "@/app/components/Search/SearchCard";
import { getSearchResults } from "@/lib/actions/fetchProduct.actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const valuesString = Object.values(searchParams).join(", ");
  const result = await getSearchResults({
    searchString: searchParams.q || "",
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
    sortOrder: searchParams?.sort === "1" ? 1 : -1,
    sortBy: searchParams?.by === "Price" ? "Price" : "createdAt",
    category: searchParams?.category,
  });

  return (
    <main className=" flex w-full justify-center">
      <div className="max-w-screen-md">
        <Filter />
        <p className="mb-4 text-xl font-semibold">
          Showing {result.skipAmount + 1} –{" "}
          {result.skipAmount + result.productsCount} of{" "}
          {result.totalProductsCount} results for &quot;
          {searchParams.q || "All"}&quot;
          {searchParams.category ? ` in ${searchParams.category}` : ""}
        </p>

        {result.products.length === 0 ? (
          <p className="no result">No Result</p>
        ) : (
          <>
            {result.products.map((product) => (
              <SearchCard
                key={product._id}
                id={product._id}
                image_url={product.Images[0]}
                name={product.Product_Name}
                price={product.Price}
                description={product.Description}
                condition={product.Condition}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
