import { PrismaClient } from "@prisma/client";

// Lazy singleton pattern — safe during `next build` static generation
// when DATABASE_URL may not be available yet.

let _db: PrismaClient | null = null;

export function getDb(): PrismaClient {
  if (!_db) {
    _db = new PrismaClient();
  }
  return _db;
}
