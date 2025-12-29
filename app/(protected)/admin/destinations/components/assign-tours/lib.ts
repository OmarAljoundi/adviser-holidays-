import { queryTourSchema } from "@/schema";
import { z } from "zod";

export const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Name is required" }),
  deletedAttributes: z.array(z.object({ id: z.number() })).default([]),
  attributes: z.array(
    z.object({
      id: z.number().optional(),
      title: z.string().min(1, { message: "Title is required" }),
      order: z.number().optional(),
      tours: z.array(queryTourSchema.partial()),
    })
  ),
});

export type FormValues = z.infer<typeof formSchema>;
