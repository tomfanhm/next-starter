import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/dashboard" } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a provider to continue
        </p>
      </div>

      <div className="space-y-3">
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: callbackUrl });
          }}
        >
          <Button className="w-full" type="submit">
            Continue with GitHub
          </Button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
        >
          <Button className="w-full" variant="outline" type="submit">
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
