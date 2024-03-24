"use client";

import { getSearchResults } from "@/lib/actions/fetchProduct.actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export type SearchCard = JSX.Element;
let page = 2;
function LoadMore({
  datas = [],
  pageSize,
}: {
  datas?: SearchCard[];
  pageSize: number;
}) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<SearchCard[]>(datas);
  const [isNext, setIsNext] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams!.get("q") || "";
  const category = searchParams?.get("category");
  const sort = searchParams!.get("sort") || "";
  const sortBy = searchParams!.get("by") || "";

  useEffect(() => {
    if (inView) {
      // Add a delay of 500 milliseconds
      const delay = 500;

      const timeoutId = setTimeout(() => {
        getSearchResults({
          searchString: search || "",
          pageNumber: page,
          pageSize: pageSize,
          sortOrder: sort === "1" ? 1 : -1,
          sortBy: sortBy === "Price" ? "Price" : "createdAt",
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
  }, [inView, data]);

  return (
    <>
      {data}

      {isNext && (
        <div ref={ref} id="load" className="self-center">
          {inView && (
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
