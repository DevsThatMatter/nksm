import { Input } from "@/app/components/ui/input";
import Image from "next/image";

interface StepFourProps {
  data: { itemName: string; itemPrice: string };
  onDataChange: (data: { itemName: string; itemPrice: string }) => void;
}

export function StepFour({ data, onDataChange }: StepFourProps) {
  return (
    <>
      <div className="flex-row box-border">
        <div>Confirmation</div>
        <div className="flex space-x-9">
          <div className="bg-gray-200 dark:bg-gray-950 p-2 rounded-sm shadow-2xl max-w-20">
            <Image
              src=""
              alt="Desert Cooler"
              className="max-w-full h-auto rounded-sm"
            />
          </div>
          <div>
            <h1>{data.itemName}</h1>
            <h1>{`Rs ${data.itemPrice}`}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
