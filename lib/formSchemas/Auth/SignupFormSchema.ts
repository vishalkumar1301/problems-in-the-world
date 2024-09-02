import * as z from "zod";
import { loginSchema } from "./LoginFormSchema";

export const signupSchema = loginSchema.extend({
	email: z.string().email("Invalid email address"),
	confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;