import { z } from "zod";
const FormDataSchema = z.object({
  iname: z.string().min(1, "Name is required").max(30, "Can't exceed 30 words"),

  condition: z.string().min(1, "Condition is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1500, "Can't exceed 1500 words"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce
    .number()
    .min(1, "Price must be at least 1")
    .max(999999, "Can't exceed 999999"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  id: z.string().optional(),
});
export const FormDataSchemaFront = FormDataSchema.extend({
  images: z
    .any()
    .array()
    .min(1, "At least 1 image required")
    .max(6, "Maximum 6 images allowed"),
  negotiate: z.string().transform((value) => (value === "Yes" ? true : false)),
});
export const FormDataSchemaBack = FormDataSchema.extend({
  images: z
    .string()
    .url()
    .array()
    .min(1, "At least 1 image required")
    .max(6, "Maximum 6 images allowed"),
  negotiate: z.boolean(),
});
