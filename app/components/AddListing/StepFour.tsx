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
        <div className="flex space-x-4 items-center">
          <div className="bg-gray-200 dark:bg-gray-950 p-2 rounded-lg shadow-2xl max-w-40 max-h-40">
            <Image
              src=""
              alt="Desert Cooler"
              className="max-w-full h-auto rounded-lg"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {data.itemName} <>item name</>
            </h1>
            <p className="text-gray-500">
              {`Description: Add description here Add description here Add description here Add description here Add description here Add description here Add description here Add description here Add description here`}
            </p>
            <h1 className="text-xl font-bold">
              {`Price: Rs ${data.itemPrice}`} <>999</>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
