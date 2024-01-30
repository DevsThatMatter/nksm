import { Input } from "@/app/components/ui/input";
import { Textarea } from "../ui/textarea";

interface StepTwoProps {
  data: { category: string; description: string };
  onDataChange: (data: { category: string; description: string }) => void;
}

export function StepTwo({ data, onDataChange }: StepTwoProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ ...data, [e.target.id]: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="grid grid-cols-max items-center gap-4">
        <Input
          id="category"
          placeholder="Category"
          className="col-span-3"
          value={data.category}
          onChange={handleInputChange}
        />
        <Textarea
          id="description"
          placeholder="Enter Description"
          className="col-span-3 h-20 resize-y pl-4 pt-4 max-h-48"
          value={data.description}
          onChange={handleTextareaChange}
        />
      </div>
    </>
  );
}
