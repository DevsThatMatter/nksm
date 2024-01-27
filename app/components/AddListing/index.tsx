'use client'
import { useState } from 'react';
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
import { Label } from "@/app/components/ui/label";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour"; // Assuming you have a StepFour component

export function AddListing() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    // Increment current step when "Next" is clicked
    setCurrentStep(currentStep + 1);
  };

  // Define the content for each step
  const stepContent: Record<number, JSX.Element> = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    // 4: <StepFour />,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="relative">
          <Icons.add className="absolute left-2 m-auto top-0 bottom-0 h-5 w-5" />
          <span className="hidden sm:inline-block pl-4"> Add Listing </span>
        </Button>
      </DialogTrigger>
      <div className="grid gap-4">
        <DialogContent>
          <DialogHeader>
            <div>{`Step ${currentStep} of 4.`}</div>
            <DialogTitle>Add Listing</DialogTitle>
            <DialogDescription>
              Provide details for your new listing.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-lg shadow-2xl">
            {stepContent[currentStep]}
          </div>
          <DialogFooter className="flex mt-auto">
            {currentStep < 4 && (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
