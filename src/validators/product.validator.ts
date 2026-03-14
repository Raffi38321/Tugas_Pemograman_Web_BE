import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  isAvailable: z.coerce.boolean(),
  stock: z.coerce.number(),
});

export const productUpdateSchema = z.object({
  name: z.string().optional(),
  price: z.coerce.number().optional(),
  isAvailable: z.coerce.boolean().optional(),
  stock: z.coerce.number().optional(),
});
