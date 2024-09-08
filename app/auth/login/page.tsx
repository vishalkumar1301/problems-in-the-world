"use client"

import LoginForm from "@/components/Auth/LoginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="w-full">
          <Link href="/auth/signup">Need an account? Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}