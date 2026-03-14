import { z } from "zod";

export const rawMaterialSchema = z.object({
  name: z.string(),
  stock: z.coerce.number(),
  unit: z.string(),
});

export const rawMaterialUpdateSchema = z.object({
  name: z.string().optional(),
  stock: z.coerce.number().optional(),
  unit: z.string().optional(),
});
