import { z } from "zod";
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const FormDataSchema = z.object({
  iname: z.string().min(1, "name is required"),

  condition: z.string().min(1, "condition is required"),
  Description: z.string().min(1, "description is required"),

  images: z
    .any()
    .refine((files) => files?.length > 0, "Image is required.")
    .refine((files) => {
      let ans: boolean = true;
      for (let i = 0; i < files?.length; i++) {
        ans = ans && files?.[i].size <= MAX_FILE_SIZE;
      }
      return ans;
    },"Maximum accepted file size is 5 mb")
    .refine((files) => {
      let ans: boolean = true;
      for (let i = 0; i < files?.length; i++) {
        ans = ans && ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[i]?.type);
      }
      return ans;
    }, ".jpg, .jpeg, .png and .webp files are accepted."),

  Price: z.coerce
    .number()
    .min(1, "Price can't be left empty")
});
