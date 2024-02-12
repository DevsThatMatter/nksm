"use client";

import { z } from "zod";




export const FormSchema = z.object({
  itemName: z.string().min(1, "item name is needed"),
  Category: z.string().min(1, "item Category is needed"),
  Description: z.string().min(1, "item Description is needed"),
  itemPrice: z.number().min(1, "Price is needed"),
  itemCondition: z.string().min(1, "item condition is needed"),
});
