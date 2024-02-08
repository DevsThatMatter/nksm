"use client";

import { Icons } from "@/app/utils/icons";
import { UploadDropzone } from "@/lib/uploadthing";
import '@uploadthing/react/styles.css';
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface FileUploadProps {
  endpoint: "messageFile" | "image";
  value: string;
  onChange: (url?: string) => void;
}

export default function FileUpload({
  endpoint,
  value,
  onChange,
}: FileUploadProps) {
  const fileType = value.split(".").pop(); // This will get the extension of the file

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-40 w-40">
        <button
          className="flex items-center justify-center absolute top-0 right-0 w-4 h-4 bg-rose-400 rounded-full z-50 text-white"
          onClick={() => { onChange(""); }}
        >
          <Icons.remove />
        </button>
        {<Image
          layout="fill"
          objectFit="cover"
          src={value}
          alt="Uploaded Image"
          className="rounded-full"
        />
        || <Skeleton/>}
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        console.log(error);
      }}
    />
  );
}
