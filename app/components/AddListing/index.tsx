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

export function AddListing() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stepOneError, setStepOneError] = useState("");
  const [stepTwoError, setStepTwoError] = useState("");
  const [stepThreeError, setStepThreeError] = useState("");
  const [stepFourError, setStepFourError] = useState("");

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
      setStepOneError("Fill in Item Name");
      return false;
    } 
    if (!stepOneData.image) {
      setStepOneError("Please upload an image of the product.");
      return false;
    }
    else {
      setStepOneError("");
      return true;
    }
  };

  const validateStepTwo = () => {
    if (!stepTwoData.category.trim()) {
      setStepTwoError("Fill in Category");
      return false;
    } 
    if (!stepTwoData.description.trim()) {
      setStepTwoError("Please enter a description.");
      return false;}
    else {
      setStepTwoError("");
      return true;
    }
  };

  const validateStepThree = () => {
    if (!stepThreeData.price.trim()) {
      setStepThreeError("Fill in Price");
      return false;
    } else if (!stepThreeData.condition) {
      setStepThreeError("Select Condition");
      return false;
    } else if (!stepThreeData.expiryDate) {
      setStepThreeError("Select Expiry Date");
      return false;
    } else {
      setStepThreeError("");
      return true;
    }
  };

  const validateStepFour = () => {
    if (!stepFourData.itemName.trim()) {
      setStepFourError("Fill in Item Name");
      return false;
    } else if (!stepFourData.itemPrice.trim()) {
      setStepFourError("Fill in Item Price");
      return false;
    } else {
      setStepFourError("");
      return true;
    }
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
          
          {currentStep === 1 && stepOneError && (
            <p className="text-red-500">{stepOneError}</p>
          )}
          {currentStep === 2 && stepTwoError && (
            <p className="text-red-500">{stepTwoError}</p>
          )}
          {currentStep === 3 && stepThreeError && (
            <p className="text-red-500">{stepThreeError}</p>
          )}
          {currentStep === 4 && stepFourError && (
            <p className="text-red-500">{stepFourError}</p>
          )}
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
