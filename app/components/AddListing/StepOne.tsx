import { Input } from "@/app/components/ui/input";

interface StepOneProps {
  data: { item: string; image: File | null };
  onDataChange: (data: { item: string; image: File | null }) => void;
}

export function StepOne({ data, onDataChange }: StepOneProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ ...data, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onDataChange({ ...data, image: file });
  };

  return (
    <>
      <div className="mb-4">
        <div className="grid grid-cols-max items-center gap-4">
          <Input
            id="item"
            placeholder="Product Name"
            className="col-span-3"
            value={data.item}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-5">
        <Input
          id="image"
          className="max-w-[200px] h-[150px]"
          type="file"
          onChange={handleFileChange}
        />
        <span>Input image of the product</span>
      </div>
    </>
  );
}
