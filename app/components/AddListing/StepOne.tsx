import React from "react";
import { useFormContext } from "./FormContext";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { step1Schema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

export function StepOne({
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
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1,
  });

  const processForm: SubmitHandler<{ item: string; images: File[] }> = (
    data
  ) => {
    setFormData({
      ...formData,
      step1: data,
    });
    handleNext();
  };


  return (
    <form onSubmit={handleSubmit(processForm)}>
      <Input type="text" {...register("item")} min={1} />
      {errors?.item && (
        <span className="text-red-500">{errors.item.message}</span>
      )}{" "}
      {/* Display error message */}
      <Input
        id="images"
        type="file"
        onChange={(e) => {
          const fileList = e.target.files;
          const event = {
            target: {
              files: fileList,
              type: "file",
            },
          };
          register("images").onChange(event);
        }}
        multiple
      />
      {errors?.images && (
        <span className="text-red-500">{errors.images.message}</span>
      )}{" "}
      {/* Display error message */}
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
