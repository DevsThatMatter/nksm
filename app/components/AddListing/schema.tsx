import { z } from 'zod'

export const FormDataSchema = z.object({
  iname: z.string().min(1, 'name is required'),
 
  condition: z.string().min(1, 'Country is required'),
  Descrition: z.string().min(1, 'Street is required'),
  
})