import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain atleast 3 characters.")
    .max(30, "Name can only contain a maximum of 30 letters."),
});
