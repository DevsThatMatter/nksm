import { z } from 'zod'
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const FormDataSchema = z.object({
  iname: z.string().min(1, 'name is required'),
  
  condition: z.string().min(1, 'condition is required'),
  Description: z.string().min(1, 'description is required'),

  images: z
    .array(z.any())
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE))
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png, and .webp formats are supported.'
    ),
  })
