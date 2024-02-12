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
import { FormSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { DragHandleDots1Icon } from "@radix-ui/react-icons";

export function AddListing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
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
  type Inputs = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  type FieldName = keyof Inputs;

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

          <form onSubmit={handleSubmit(processForm)}>
            {currentStep === 1 && <StepOne />}
            {currentStep === 2 && <StepTwo />}
            {currentStep === 3 && <StepThree />}
            {currentStep === 4 && <StepFour />}
          </form>

          <DialogFooter className="flex mt-auto">
            <Button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 4}
            >
              Next
            </Button>

            <Button
              type="button"
              onClick={handleFinish}
              disabled={
                currentStep === 1 || currentStep === 2 || currentStep === 3
              }
            >
              Finish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
