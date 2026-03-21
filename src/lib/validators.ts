import { z } from "zod";

// ─── Shared validation schemas ───────────────────────────

export const emailSchema = z.string().email("Invalid email address").min(1);

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// ─── Example: User profile update ────────────────────────

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: emailSchema,
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ─── Server Action helper ────────────────────────────────

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export function createActionResult<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function createActionError(error: string): ActionResult<never> {
  return { success: false, error };
}
