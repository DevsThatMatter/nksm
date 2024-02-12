import React from "react";
import { useFormContext } from "./FormContext";

export function StepOne() {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      step1: { ...formData.step1, item: e.target.value },
    });
  };
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, step1: { ...formData.step1, images: files } });
  };
  const item = formData.step1.item || "";

  return (
    <div>
      <input type="text" value={item} onChange={handleInputChange} min={1} />
      <input
        id="images" // Change the id to "images" to match the data structure
        className="max-w-[200px] h-[150px]"
        type="file"
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      />
    </div>
  );
}
