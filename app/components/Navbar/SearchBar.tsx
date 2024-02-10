"use client";
import { Input } from "@/app/components/ui/input";
import { Icons } from "@/app/utils/icons";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

type Product = {
  _id: any;
  Seller: any;
  Total_Quantity_Available: any;
  Product_Name: any;
  Description: any;
  Price: any;
  Images: any;
  Condition: any;
  Category: any;
  expires_in: any;
  is_archived: any;
  createdAt: any;
  updatedAt: any;
};

type ProductsArray = Product[];

export default function SearchBar({ products }: { products: ProductsArray }) {
  const [input, setInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const filteredProducts = products?.filter((product) =>
    product.Product_Name.toLowerCase().startsWith(input.toLowerCase()),
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/search?q=" + input);
  };

  const handleFocusOut = () => {
    if (dropdownRef.current) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="relative" ref={dropdownRef}>
        <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <div>
          <Input
            placeholder="Search"
            className="pl-8 w-100% sm:w-56 md:w-[31.4rem]"
            onChange={useDebouncedCallback((e) => { // debounce can create artificial delay before querying db
              setInput(e.target.value);
              setIsDropdownOpen(!!e.target.value); // Show dropdown when input is not empty
            })}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={handleFocusOut}
          />
        </div>
        {input &&
        isDropdownOpen &&
        filteredProducts &&
        filteredProducts.length > 0 ? (
          <div className="absolute left-0 right-0 mt-1 rounded-md shadow-lg z-50 max-h-60 overflow-auto bg-card border"> 
            {filteredProducts.map((product, index) => (
            <li
            key={index}
            className="flex items-center justify-between px-4 py-2 hover:bg-accent border"
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
          
            ))}
          </div>
        ) : (
          // Render "No results" message when no products match the input
          input &&
          isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 rounded-md shadow-lg z-50 max-h-60 overflow-auto bg-card border">
              <div className="px-4 py-2">Search NKSM for "{input}"</div>
            </div>
          )
        )}
      </div>
    </form>
  );
}
