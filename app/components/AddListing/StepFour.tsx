import { Input } from "@/app/components/ui/input";
import Image from "next/image";

export function StepFour() {
  return (
    <>
      <div className="flex-row box-border">
        <div>
          Confirmation
        </div>

        <div className="flex space-x-9">
          <div className="bg-gray-200 dark:bg-gray-950 p-2 rounded-sm shadow-2xl max-w-20">
            {/* Place your image component here */}
            <Image src="" alt="Desert Cooler" className="max-w-full h-auto rounded-sm" />
          </div>
          <div>
              <h1>Desert Cooler</h1>
              <h1>Rs 5000</h1>
            </div>
          </div>
        </div>
      
    </>
  );
}
