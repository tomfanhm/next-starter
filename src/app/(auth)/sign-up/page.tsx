import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to get started
        </p>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Auth.js uses OAuth providers — sign in to create your account automatically.</p>
      </div>

      <Button className="w-full" asChild>
        <Link href="/sign-in">Go to Sign In</Link>
      </Button>
    </div>
  );
}
