import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";
import { step1Schema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof step1Schema>;
const {
  register,
  handleSubmit,
  watch,
  reset,
  trigger,
  formState: { errors },
} = useForm<Inputs>({
  resolver: zodResolver(step1Schema),
  defaultValues: {
    item: "",
    images: [],
  },
});

const processForm: SubmitHandler<Inputs> = (data) => {
  reset();
};

type FieldName = keyof Inputs;

export function StepOne() {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      step1: { ...formData.step1, item: e.target.value },
    });
    console.log(formData.step1.item);
  };
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, step1: { ...formData.step1, images: files } });
  };
  const item = formData.step1.item || "";

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <Input type="text" value={item} onChange={handleInputChange} min={1} />
      <Input
        id="images" // Change the id to "images" to match the data structure
        className="max-w-[200px] h-[150px]"
        type="file"
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      />

      <Button >Next</Button>

    </form>
  );
}
