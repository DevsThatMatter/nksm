'use client';

import { Input } from "@/app/components/ui/input";
import { Icons } from "@/app/utils/icons";
import { useState, useRef } from "react";
import { categories } from "@/constants/categories";
import { useRouter } from 'next/navigation';


export default function SearchBar() {
  const [input, setInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const products = categories;
  const router = useRouter();
  const dropdownRef = useRef(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(input.toLowerCase())
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
            onChange={(e) => {
              setInput(e.target.value);
              setIsDropdownOpen(!!e.target.value); // Show dropdown when input is not empty
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={handleFocusOut}
          />
        </div>
        {input && isDropdownOpen && filteredProducts.length > 0 ? (
          <div className="absolute left-0 right-0 mt-1 rounded-md shadow-lg z-50 max-h-60 overflow-auto bg-card border">
            {filteredProducts.map((product, index) => (
              <li key={index} className="flex items-center px-4 py-2  hover:bg-accent rounded-md border">
                <img
                  alt={product.name}
                  className="w-16 h-16 rounded-md"
                  src={product.imgUrl}
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                />
                <span className="ml-4">{product.name}</span>
              </li>
            ))}
          </div>
        ) : (
          // Render "No results" message when no products match the input
          input && isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 rounded-md shadow-lg z-50 max-h-60 overflow-auto bg-card border">
              <div className="px-4 py-2">No Results</div>
            </div>
          )
        )}
      </div>
    </form>
  );
}
