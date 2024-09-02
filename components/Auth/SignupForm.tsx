"use client"




import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "@/lib/formSchemas/Auth/SignupFormSchema";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";




export default function SignupForm() {




    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });




    const onSubmit = async (values: SignupFormValues) => {
        console.log(values);
        toast({
            title: "Signed up successfully",
            description: `Welcome, ${values.username}!`,
        });
    };




    return (
        <>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">




                        <Label htmlFor="username">Username</Label>

                        <Input id="username" placeholder="Enter your username" {...register("username")} />

                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}




                    </div>
                    <div className="space-y-2">




                        <Label htmlFor="email">Email</Label>

                        <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />

                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}




                    </div>
                    <div className="space-y-2">




                        <Label htmlFor="password">Password</Label>

                        <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />

                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}




                    </div>
                    <div className="space-y-2">




                        <Label htmlFor="confirmPassword">Confirm Password</Label>

                        <Input id="confirmPassword" type="password" placeholder="Confirm your password" {...register("confirmPassword")} />

                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}




                    </div>




                    <Button type="submit" className="w-full">Sign Up</Button>




                </form>
            </CardContent>
        </>
    );
}