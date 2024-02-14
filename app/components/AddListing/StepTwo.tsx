import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";
import { step2Schema } from "./FormSchema"; // Import step2Schema
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";

export function StepTwo({
  handlePrev,
  handleNext,
  currentStep,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  currentStep: number;
}) {
  const { formData, setFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      ...formData.step2,
      price: formData.step2?.price || 0, // Ensure default value for price is set
    },
  });

  const processForm: SubmitHandler<{ price: number }> = (data) => {
    data.price = parseFloat(data.price);
    setFormData({
      ...formData,
      step2: data,
    });
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <Input
        type="number"
        {...register("price")}
        min={0}
        defaultValue={formData.step2?.price || ""}
      />
      {errors?.price && (
        <span className="text-red-500">{errors.price.message}</span>
      )}
      <div className="">
        <Button type="button" onClick={handlePrev} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button type="submit" disabled={currentStep === 4}>
          Next
        </Button>
      </div>
    </form>
  );
}
