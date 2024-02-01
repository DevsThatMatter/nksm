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
import { StepFour } from "./StepFour";
import { set } from "mongoose";

export function AddListing() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [stepOneData, setStepOneData] = useState({ item: "", image: null });
  const [stepTwoData, setStepTwoData] = useState({
    category: "",
    description: "",
  });
  const [stepThreeData, setStepThreeData] = useState({
    price: "",
    condition: "",
    expiryDate: null,
  });
  const [stepFourData, setStepFourData] = useState({
    itemName: "",
    itemPrice: "",
  });

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
       // setError("Please fill in all the required fields before proceeding.");
    }
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
    console.log("Listing data submitted:", {
      stepOneData,
      stepTwoData,
      stepThreeData,
      stepFourData,
    });
    setIsDialogOpen(false);
    setCurrentStep(1);
  };

  const validateStepOne = () => {
    if (!stepOneData.item.trim()) {
      alert("Please enter a product name.");
      return false;
    }
  
    if (!stepOneData.image) {
      alert("Please upload an image of the product.");
      return false;
    }
  
    return true;
  };
  
  const validateStepTwo = () => {
    if (!stepTwoData.category.trim()) {
      alert("Please enter a category.");
      return false;
    }
  
    if (!stepTwoData.description.trim()) {
      alert("Please enter a description.");
      return false;
    }
  
    return true;
  };
  
  const validateStepThree = () => {
    if (!stepThreeData.price.trim()) {
      alert("Please enter a price.");
      return false;
    }
  
    if (!stepThreeData.condition) {
      alert("Please select a condition.");
      return false;
    }
  
    if (!stepThreeData.expiryDate) {
      alert("Please select an expiry date.");
      return false;
    }
  
    return true;
  };
  
  const validateStepFour = () => {
    if (!stepFourData.itemName.trim()) {
      alert("Please enter an item name.");
      return false;
    }
  
    if (!stepFourData.itemPrice.trim()) {
      alert("Please enter an item price.");
      return false;
    }
  
    return true;
  };
  
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return validateStepOne();
      case 2:
        return validateStepTwo();
      case 3:
        return validateStepThree();
      case 4:
        return validateStepFour();
      default:
        return true;
    }
  };
  

  const stepContent: Record<number, JSX.Element> = {
    1: <StepOne data={stepOneData} onDataChange={setStepOneData} />,
    2: <StepTwo data={stepTwoData} onDataChange={setStepTwoData} />,
    3: <StepThree data={stepThreeData} onDataChange={setStepThreeData} />,
    4: <StepFour data={stepFourData} onDataChange={setStepFourData} />,
  };

  return (
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
        <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-lg shadow-2xl">
          {stepContent[currentStep]}
        </div>
        <DialogFooter className="flex mt-auto">
          {currentStep > 1 && currentStep < 4 && (
            <Button type="button" onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentStep < 4 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button type="button" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

