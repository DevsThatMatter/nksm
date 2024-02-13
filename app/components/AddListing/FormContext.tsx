import React, { createContext, useContext, useState } from "react";
import { step1Schema, step2Schema, step3Schema } from "./FormSchema";


const formType = {
  step1: { item: "", images: [] },
  step2: {
    price: 0,
  },
  step3: {
    description: "",
  },
}

type FormState = {
  step1: (typeof step1Schema)["_input"];
  step2: (typeof step2Schema)["_input"];
  step3: (typeof step3Schema)["_input"];
};

const FormContext = createContext<{
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}>({
  formData: formType,
  setFormData: () => {},
});

export function useFormContext() {
  return useContext(FormContext);
}

export function FormProvider({ children }: any) {
  const [formData, setFormData] = useState<FormState>(formType);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
