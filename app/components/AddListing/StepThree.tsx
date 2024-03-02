import { Input } from "@/app/components/ui/input";
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
          <select id="negotiable" className="border p-2">
            <option value="negotiable">Negotiable</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <label htmlFor="expiryDate" className="text-gray-500">
          Expiry Date
        </label>
        <Input id="expiryDate" type="date" className="border p-2" />
      </div>
    </>
  );
}
