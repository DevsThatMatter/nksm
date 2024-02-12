import React from "react";
import { useFormContext } from "./FormContext";

export function StepTwo() {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, step2: { price: parseFloat(e.target.value) } });
  };

  return (
    <div>
      <input
        type="number"
        value={formData.step2?.price || ""}
        onChange={handleInputChange}
      />
    </div>
  );
}
