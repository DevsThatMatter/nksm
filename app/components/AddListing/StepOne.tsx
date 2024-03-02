import { Input } from "@/app/components/ui/input";

export function StepOne() {
  return (
    <>
      <div className="mb-4">
        <div className="grid-cols-max grid items-center gap-4">
          <Input id="item" placeholder="Product Name" className="col-span-3" />
        </div>
      </div>

      <div className="mt-5 flex items-center space-x-4">
        <Input id="image" className="h-[150px] max-w-[200px]" type="file" />
        <span>Input image of the product</span>
      </div>
    </>
  );
}
