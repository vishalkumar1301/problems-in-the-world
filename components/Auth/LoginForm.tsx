"use client"




import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/formSchemas/Auth/LoginFormSchema";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";




export default function LoginForm() {




    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });




    const onSubmit = async (values: LoginFormValues) => {
        console.log(values);
        toast({
            title: "Logged in successfully",
            description: `Welcome, ${values.username}!`,
        });
    };




    return (
        <>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to login</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">




                        <Label htmlFor="username">Username</Label>

                        <Input id="username" placeholder="Enter your username" {...register("username")} />

                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}




                    </div>
                    <div className="space-y-2">




                        <Label htmlFor="password">Password</Label>

                        <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />

                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}




                    </div>




                    <Button type="submit" className="w-full">Login</Button>




                </form>
            </CardContent>
        </>
    );
}