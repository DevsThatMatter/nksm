import { z } from "zod";
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const FormDataSchema = z.object({
  iname: z.string().min(1, "Name is required"),

  condition: z.string().min(1, "Condition is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1500, "cannot exceed 1500 words"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).max(6, "Maximum 6 images allowed").nonempty(),
  price: z.coerce.number().min(1, "Price must be atleast 1"),
  quantity: z.coerce.number().min(1, "Quantity must be atleast 1"),
  negotiate: z.string(),
});
