"use client";

import { getSearchResults } from "@/lib/actions/fetchProduct.actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export type SearchCard = JSX.Element;

function LoadMore({
  pages,
  datas = [],
}: {
  pages: number;
  datas?: SearchCard[];
}) {
  const { ref, inView } = useInView();
  let page = pages;
  const [data, setData] = useState<SearchCard[]>(datas);
  const [isLoading, setIsLoading] = useState(true);
  const [isNext, setIsNext] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams!.get("q") || "";
  const category = searchParams?.get("category");
  const sort = searchParams!.get("sort") || "";
  const sortBy = searchParams!.get("by") || "";

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      // Add a delay of 500 milliseconds
      const delay = 500;

      const timeoutId = setTimeout(() => {
        getSearchResults({
          searchString: search || "",
          pageNumber: page,
          pageSize: 5,
          sortOrder: sort === "1" ? 1 : -1,
          sortBy: sortBy === "Price" ? "Price" : "createdAt",
          category: category === null ? undefined : category,
        }).then((res) => {
          console.log(res);
          setData([...data, ...res.productsData]);
          page++;
          res.isNext === false && setIsNext(false);
        });
        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading]);

  return (
    <>
      {data}

      {isNext && (
        <div ref={ref} id="load" className="self-center">
          {inView && isLoading && (
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      )}
    </>
  );
}

export default LoadMore;
