import { z } from "zod";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const step1Schema = z.object({
  item: z.string().min(1, "This field can't be left empty"),
  images: z
    .array(
      z.object({
        size: z.number(),
        type: z.string(),
      }),
    )
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE))
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    ),
});

export const step2Schema = z.object({
  price: z.number().min(0, "This field can't be left empty"),
});

export const step3Schema = z.object({
  description: z.string().min(1, "This field can't be left empty"),
});
