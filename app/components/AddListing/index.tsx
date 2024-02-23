"use client";
import { useState } from "react";
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

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour"; // Assuming you have a StepFour component

export function AddListing({
  children = (
    <Button variant="default" className="relative">
      <Icons.add className="absolute bottom-0 left-2 top-0 m-auto h-5 w-5" />
      <span className="hidden pl-4 sm:inline-block"> Add Listing </span>
    </Button>
  ),
}: {
  children?: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleDialogOpen = () => {
    console.log("triggered");
    if (isDialogOpen) {
      setIsDialogOpen(false);
      setCurrentStep(1);
    } else {
      setIsDialogOpen(true);
    }
  };

  // Define the content for each step
  const stepContent: Record<number, JSX.Element> = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    // 4: <StepFour />,
  };

  return (
    <Dialog onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div>{`Step ${currentStep} of 4.`}</div>
          <DialogTitle>Add Listing</DialogTitle>
          <DialogDescription>
            Provide details for your new listing.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-gray-50 p-6 shadow-2xl dark:bg-gray-950">
          {stepContent[currentStep]}
        </div>
        <DialogFooter className="mt-auto flex">
          {currentStep < 4 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
