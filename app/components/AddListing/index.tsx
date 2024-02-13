"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Icons } from "@/app/utils/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import Image from "next/image";

import { ConditionEnum } from "@/types";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { DragHandleDots1Icon } from "@radix-ui/react-icons";

import { FormProvider, useFormContext } from "./FormContext";

export function AddListing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { formData, setFormData } = useFormContext();
  const Steps = [
    { Fields: ["item", "images"] },
    { Fields: ["price"] },
    {
      Fields: ["description"],
    },
  ];
  const handleNext = () => {
    return setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleDialogOpen = () => {
    if (isDialogOpen) {
      setIsDialogOpen(false);
      setCurrentStep(1);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleFinish = () => {
    setIsDialogOpen(false);
    setCurrentStep(1);
  };

  return (
    <>
      <Dialog onOpenChange={handleDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="relative"
            onClick={handleDialogOpen}
          >
            <Icons.add className="absolute left-2 m-auto top-0 bottom-0 h-5 w-5" />
            <span className="hidden sm:inline-block pl-4"> Add Listing </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[30rem]">
          <DialogHeader>
            <div>{`Step ${currentStep} of 4.`}</div>
            <DialogTitle>Add Listing</DialogTitle>
            <DialogDescription>
              Provide details for your new listing.
            </DialogDescription>
          </DialogHeader>

          <FormProvider>
            {currentStep === 1 && (
              <StepOne
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentStep={currentStep}
              />
            )}
            {currentStep === 2 && <StepTwo />}
            {currentStep === 3 && <StepThree />}
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
