import React from "react";
import { useFormContext } from "./FormContext";
import { step3Schema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button"; // Assuming you have a custom Button component
import { useForm, SubmitHandler } from "react-hook-form";

export function StepThree({
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
    resolver: zodResolver(step3Schema),
    defaultValues: formData.step3 || { description: "" }, // Correct defaultValues to use formData.step3 or an empty object with description
  });

  const processForm: SubmitHandler<{ description: string }> = (data) => {
    setFormData({
      ...formData,
      step3: data,
    });
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <textarea
        {...register("description")} // Register the textarea field
        defaultValue={formData.step3?.description || ""} // Set defaultValue for textarea
      />
      {errors?.description && ( // Check for errors on "description" field
        <span className="text-red-500">{errors.description.message}</span>
      )}{" "}
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
