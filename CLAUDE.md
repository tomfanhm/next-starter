# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                    # Dev server (Turbopack)
pnpm build                  # Production build
pnpm lint                   # ESLint (zero warnings enforced)
pnpm lint:fix               # ESLint autofix
pnpm typecheck              # TypeScript check
pnpm test                   # Unit tests (Vitest)
pnpm test:watch             # Unit tests in watch mode
pnpm test:e2e               # E2E tests (Playwright, requires built app)
pnpm db:generate            # Generate Prisma client
pnpm db:migrate             # Run Prisma migrations
pnpm db:push                # Push schema to database
pnpm db:studio              # Open Prisma Studio
```

Run a single unit test: `pnpm vitest run tests/unit/validators.test.ts`
Run a single E2E test: `pnpm playwright test tests/e2e/auth.spec.ts`

## Architecture

**Next.js 16 App Router** with route groups:
- `src/app/(auth)/` — public auth pages (sign-in, sign-up), centered layout
- `src/app/(dashboard)/` — protected pages, dashboard layout with nav/header
- `src/app/api/auth/[...nextauth]/` — Auth.js API handler

**Route protection** uses `src/proxy.ts` (Next.js 16 proxy pattern, not middleware.ts). Protected paths are defined there; unauthenticated users redirect to `/sign-in`.

**Auth**: Auth.js v5 beta with PrismaAdapter, database session strategy, GitHub + Google OAuth. Config in `src/lib/auth.ts`.

**Database**: Prisma with PostgreSQL. Lazy singleton client in `src/lib/db.ts` (use `getDb()`, not direct import). Schema has Auth.js models (User, Account, Session, VerificationToken).

**Client state**: TanStack Query with separate factory functions for server/browser in `src/lib/query-client.ts`. Providers wrapper in `src/providers/index.tsx`.

**Components**: CVA-based with Radix UI Slot (asChild pattern). Located in `src/components/ui/`.

**Validation**: Zod schemas in `src/lib/validators.ts` with `ActionResult<T>` type for server action returns.

## Code Style

- Path alias: `@/*` maps to `src/*`
- Prettier: double quotes, semicolons, trailing commas, 100 char width, Tailwind plugin
- ESLint: flat config (ESLint 9), strict TypeScript type-checked rules, simple-import-sort
- Tailwind CSS v4 with OKLch color tokens defined in `src/app/globals.css`
- Strict TypeScript (`strict: true`, target ES2022, bundler resolution)

## CI

GitHub Actions runs lint, typecheck, and unit tests in parallel. E2E tests run Chromium only. Production workflow requires `DATABASE_URL` and `AUTH_SECRET` secrets. Pre-commit hook runs lint-staged; pre-push runs full build.

## Environment

Copy `.env.example` for required variables: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, plus OAuth provider credentials. Run `pnpm db:generate` after cloning before building.
