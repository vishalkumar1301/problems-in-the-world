import SignupForm from "@/components/Auth/SignupForm";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Card className="w-full">
      <SignupForm />
      <CardFooter>
        <Button variant="link" asChild className="w-full">
          <Link href="/auth/login">Already have an account? Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}