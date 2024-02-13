import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";

export function StepTwo() {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, step2: { price: parseFloat(e.target.value) } });
  };

  return (
    <div>
      <Input
        type="number"
        value={formData.step2?.price || ""}
        onChange={handleInputChange}
      />
    </div>
  );
}
