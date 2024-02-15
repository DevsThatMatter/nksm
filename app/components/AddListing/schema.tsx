import { z } from 'zod'
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const FormDataSchema = z.object({
  iname: z.string().min(1, 'name is required'),
  
  condition: z.string().min(1, 'condition is required'),
  Descrition: z.string().min(1, 'description is required'),
  images: z.object({
    itemName: z.string().min(1, "item name is needed"),
    Category: z.string().min(1, "item Category is needed"),
    Description: z.string().min(1, "item Description is needed"),
    itemPrice: z.number().min(1, "Price is needed"),
    itemCondition: z.string().min(1, "item condition is needed"),
    images: z
    .array(z.any())
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE))
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png, and .webp formats are supported.'
    ),
  })
})