import React from "react";
import { useFormContext } from "./FormContext";
import { step3Schema } from "./formSchema";
import { z } from "zod";

type Inputs = z.infer<typeof step3Schema>;
const {
  register,
  handleSubmit,
  watch,
  reset,
  trigger,
  formState: { errors },
} = useForm<Inputs>({
  resolver: zodResolver(step3Schema),
  defaultValues: {
    step3: {
      description: "",
    },
  },
});

const processForm: SubmitHandler<Inputs> = (data) => {
  reset();
};

type FieldName = keyof Inputs;

export function StepThree() {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, step3: { description: e.target.value } });
  };

  return (
    <div>
      <textarea
        value={formData.step3?.description || ""}
        onChange={handleInputChange}
      />
    </div>
  );
}
