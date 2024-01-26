import { Input } from "@/app/components/ui/input";

export function StepOne() {
  return (
 
<>
  <div className="mb-4">
    <div className="grid grid-cols-max items-center gap-4">
      <Input id="item" placeholder="Product Name" className="col-span-3" />
    </div>
  </div>

  <div className="flex items-center space-x-4 mt-5">
    <Input id="image" className="max-w-[200px] h-[150px]" type="file" />
    <span>Input image of the product</span>
  </div>
</>

  );
}
