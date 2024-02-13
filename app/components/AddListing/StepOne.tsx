import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";

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
      <Input type="text" value={item} onChange={handleInputChange} min={1} />
      <Input
        id="images" // Change the id to "images" to match the data structure
        className="max-w-[200px] h-[150px]"
        type="file"
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      />
    </div>
  );
}
