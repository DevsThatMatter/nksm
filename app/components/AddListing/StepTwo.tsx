import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";
import { step2Schema } from "./formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = z.infer<typeof step2Schema>;
const {
  register,
  handleSubmit,
  watch,
  reset,
  trigger,
  formState: { errors },
} = useForm<Inputs>({
  resolver: zodResolver(step2Schema),
  defaultValues: {
    price: 0,
  },
});

const processForm: SubmitHandler<Inputs> = (data) => {
  reset();
};

type FieldName = keyof Inputs;

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
