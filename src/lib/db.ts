import { PrismaClient } from "@prisma/client";

// Attach to globalThis to survive HMR in development.
// Lazy so `next build` doesn't crash when DATABASE_URL is absent.

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export function getDb(): PrismaClient {
  globalForPrisma.prisma ??= new PrismaClient();
  return globalForPrisma.prisma;
}
