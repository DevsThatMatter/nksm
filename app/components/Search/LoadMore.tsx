"use client";

import { getSearchResults } from "@/lib/actions/products.actions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FilterProps } from "@/app/(root)/search/page";
import { SymbolIcon } from "@radix-ui/react-icons";

export type SearchCard = JSX.Element;
let page = 2;
function LoadMore({
  sorting,
  category,
  query,
  datas = [],
  pageSize,
}: {
  datas?: SearchCard[];
  pageSize: number;
} & FilterProps) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<SearchCard[]>(datas);
  const [isNext, setIsNext] = useState(true);

  useEffect(() => {
    if (inView) {
      // Add a delay of 500 milliseconds
      const delay = 500;

      const timeoutId = setTimeout(() => {
        getSearchResults({
          searchString: query || "",
          pageNumber: page,
          pageSize: pageSize,
          sortBy: sorting,
          category: category === null ? undefined : category,
        }).then((res) => {
          console.log(res);
          setData([...data, ...res.productsData]);
          page++;
          res.isNext === false && setIsNext(false);
        });
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView]);

  useEffect(() => {
    setIsNext(true);
    setData([]);
    page = 2;
  }, [query, category, sorting]);

  return (
    <>
      {data}

      {isNext && (
        <div ref={ref} id="load" className="w-full p-6 max-md:grid-cols-3">
          {inView && <SymbolIcon className="m-auto h-8 w-8 animate-spin " />}
        </div>
      )}
    </>
  );
}

export default LoadMore;
