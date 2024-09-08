"use client"

import SignupForm from "@/components/Auth/SignupForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="w-full">
          <Link href="/auth/login">Already have an account? Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}