import * as z from "zod";

export const ProblemCategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type ProblemCategoryFormValues = z.infer<typeof ProblemCategoryFormSchema>;