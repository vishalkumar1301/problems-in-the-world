import * as z from "zod";

export const ProblemFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.string().min(1, "Category is required"),
});

export type ProblemFormValues = z.infer<typeof ProblemFormSchema>;