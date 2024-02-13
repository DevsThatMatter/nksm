import React from "react";
import { useFormContext } from "./FormContext";
import { step3Schema } from "./formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-day-picker";
import { useForm, SubmitHandler } from "react-hook-form";

export function StepThree() {
  type Inputs = z.infer<typeof step3Schema>;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(step3Schema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  type FieldName = keyof Inputs;
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, step3: { description: e.target.value } });
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <textarea
        value={formData.step3?.description || ""}
        onChange={handleInputChange}
      />
      <Button>Next</Button>
      <Button>Prev</Button>
    </form>
  );
}
