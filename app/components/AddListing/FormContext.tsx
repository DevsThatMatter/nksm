import React, { createContext, useContext, useState } from "react";
import { FormSchema } from "./FormSchema";

type FormState = {
  step1: (typeof FormSchema)["_input"]["step1"];
  step2: (typeof FormSchema)["_input"]["step2"];
  step3: (typeof FormSchema)["_input"]["step3"];
};

const FormContext = createContext<{
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}>({
  formData: {
    step1: { item: "", images: [] },
    step2: {
      price: 0,
    },
    step3: {
      description: "",
    },
  },
  setFormData: () => {},
});

export function useFormContext() {
  return useContext(FormContext);
}

export function FormProvider({ children }: any) {
  const [formData, setFormData] = useState<FormState>({
    step1: { item: "", images: [] },
    step2: {
      price: 0,
    },
    step3: {
      description: "",
    },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
