import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";
import { step2Schema } from "./formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "react-day-picker";

export function StepTwo() {
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
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  type FieldName = keyof Inputs;
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, step2: { price: parseFloat(e.target.value) } });
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <Input
        type="number"
        value={formData.step2?.price || ""}
        onChange={handleInputChange}
      />
      <Button>Next</Button>
      <Button>Prev</Button>
    </form>
  );
}
