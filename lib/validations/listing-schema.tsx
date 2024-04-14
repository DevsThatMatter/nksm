import { z } from "zod";
export const FormDataSchema = z.object({
  iname: z.string().min(1, "Name is required").max(30, "can't exceed 30 words"),

  condition: z.string().min(1, "Condition is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1500, "can't exceed 1500 words"),
  category: z.string().min(1, "Category is required"),
  images: z
    .instanceof(File)
    .array()
    .min(1, "Atleast 1 image required")
    .max(6, "Maximum 6 images allowed"),
  price: z.coerce
    .number()
    .min(1, "Price must be atleast 1")
    .max(999999, "can't exceed 999999"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  negotiate: z.string(),
});
