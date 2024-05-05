"use client";
import { Input } from "@/app/components/ui/input";
import { Icons } from "@/app/utils/icons";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

type ProductsArray = {
  _id: string;
  Product_Name: string;
  Price: number;
  Images: string[];
}[];

export default function SearchBar({
  products,
  className,
}: {
  products: ProductsArray;
  className?: string;
}) {
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const category = searchParams!.get("category") || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname != "/search") {
      setIsDropdownOpen(false);
    }
  }, [pathname]);

  const filteredProducts = products?.filter((product) =>
    product.Product_Name.toLowerCase().startsWith(input.toLowerCase()),
  );

  const handleSearchSubmit = (formData: FormData) => {
    const input = formData.get("q")?.toString().trim();
    if (!input && pathname == "/search") {
      console.log(category);
      if (category) {
        router.push("/search?category=" + category);
      } else {
        router.push("/");
        return;
      }
    } else {
      router.push("/search?q=" + formData.get("q"));
    }
    setIsDropdownOpen(false);
  };

  return (
    <form action={handleSearchSubmit} className={className}>
      <div className="group relative flex justify-center focus-within:absolute focus-within:left-0 focus-within:right-0 focus-within:top-5 focus-within:z-50 focus-within:mx-auto focus-within:w-[80%] focus-within:bg-background">
        <div
          className={`fixed inset-0 z-[-1] hidden ${pathname === "/" ? "backdrop-blur-sm" : ""} group-focus-within:block`}
        ></div>
        <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          name="q"
          autoComplete="off"
          className="pl-8 transition-all duration-500 ease-in-out group-focus-within:w-full sm:w-56 md:w-[31.4rem] "
          onChange={useDebouncedCallback((e) => {
            // debounce can create artificial delay before querying db
            setInput(e.target.value);
            pathname != "/search"
              ? setIsDropdownOpen(!!e.target.value)
              : (e.target.value || category) &&
                router.push(
                  "/search?q=" + e.target.value + `&category=${category}`,
                  { scroll: true },
                ); // Show dropdown when input is not empty
          }, 500)}
          onFocus={() => {
            pathname != "/search" && setIsDropdownOpen(true);
          }}
          onBlurCapture={() => setTimeout(() => setIsDropdownOpen(false), 100)}
        />
        {input &&
        isDropdownOpen &&
        filteredProducts &&
        filteredProducts.length > 0 ? (
          <div className="absolute left-0 right-0 z-50 mt-10 max-h-60 overflow-auto rounded-md border bg-card shadow-lg">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <li
                  key={product._id}
                  className="flex items-center justify-between border px-4 py-2 hover:bg-accent"
                >
                  <div className="flex items-center">
                    <Image
                      alt={product.Product_Name}
                      className="rounded-md"
                      src={product.Images[0]}
                      height={56}
                      width={56}
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                    />
                    <span className="ml-4">{product.Product_Name}</span>
                  </div>
                  <span>₹ {product.Price}</span>
                </li>
              </Link>
            ))}
          </div>
        ) : (
          // Render "No results" message when no products match the input
          input &&
          isDropdownOpen && (
            <div className="absolute left-0 right-0 z-50 mt-10 max-h-60 overflow-auto rounded-md border bg-card shadow-lg">
              <div className="px-4 py-2">
                Search NKSM for &quot;{input}&quot;
              </div>
            </div>
          )
        )}
      </div>
    </form>
  );
}
