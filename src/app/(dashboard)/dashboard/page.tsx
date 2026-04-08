import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {session?.user?.name ?? "User"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Total Users", value: "—" },
          { title: "Active Sessions", value: "—" },
          { title: "API Requests", value: "—" },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
