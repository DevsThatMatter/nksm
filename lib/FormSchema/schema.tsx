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
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),

  images: z
    .any()
    .refine((files) => files?.length > 0, "Image is required.")
    .refine((files) => {
      let ans: boolean = true;
      for (let i = 0; i < files?.length; i++) {
        ans = ans && files?.[i].size <= MAX_FILE_SIZE;
      }
      return ans;
    }, "Maximum accepted file size is 5 mb")
    .refine((files) => {
      let ans: boolean = true;
      for (let i = 0; i < files?.length; i++) {
        ans = ans && ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[i]?.type);
      }
      return ans;
    }, "Only .jpg, .jpeg, .png and .webp files are accepted."),

  price: z.coerce.number().min(1, "Price must be atleast 1"),
  quantity: z.coerce.number().min(1, "Quantity must be atleast 1"),
  negotiate: z.string(),
});
