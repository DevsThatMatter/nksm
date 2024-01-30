import { Input } from "@/app/components/ui/input";
import { DatePicker } from "./components/date";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { ConditionEnum } from "@/types";

export function StepThree() {
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
            type="text"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger id="framework">
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

        <DatePicker />
      </div>
    </>
  );
}
