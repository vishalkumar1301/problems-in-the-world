import LoginForm from "@/components/Auth/LoginForm";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card className="w-full">
      <LoginForm />
      <CardFooter>
        <Button variant="link" asChild className="w-full">
          <Link href="/auth/signup">Need an account? Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}