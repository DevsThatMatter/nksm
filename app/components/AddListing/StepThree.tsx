import { Input } from "@/app/components/ui/input";
import { DatePicker } from "../ui/date";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { ConditionEnum } from "@/types";

interface StepThreeProps {
  data: { price: string; condition: string; expiryDate: Date | null };
  onDataChange: (data: {
    price: string;
    condition: string;
    expiryDate: Date;
  }) => void;
}

export function StepThree({ data, onDataChange }: StepThreeProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ ...data, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    onDataChange({ ...data, condition: value });
  };

  const handleDateChange = (date: Date) => {
    onDataChange({ ...data, expiryDate: date });
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
            INR
          </span>
          <Input
            id="price"
            placeholder="Price"
            className="pl-12 pr-4"
            type="number"
            
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger
              id="condition"
              v
              onChange={(value: string) => handleSelectChange(value)}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {Object.values(ConditionEnum)
                .filter((value) => typeof value === "string")
                .map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <label htmlFor="expiryDate" className="text-gray-500">
          Expiry Date
        </label>

        <DatePicker onChange={handleDateChange} />
      </div>
    </>
  );
}
