"use client";
import { Icons } from "@/app/utils/icons";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ImagePreview({
  params,
}: {
  params: { index: string };
}) {
  const searchParams = useSearchParams();
  const imageLink = searchParams?.get("imageLink") ?? "";
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        window.history.back();
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div
          className="relative mt-20 h-[90%] w-[70%]  max-w-4xl rounded-md bg-opacity-100"
          ref={containerRef}
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <div className="rounded-md">
              <Image
                src={imageLink}
                alt={`Product item ${params.index}`}
                width={900}
                height={900}
                className="rounded-md object-fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
