/** @format */

import { object, z } from "zod";

export const loginSchema = object({
  userEmail: z.coerce.string().email(),
  userPassword: z
    .string()
    .min(6, "Password too short")
    .max(24, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@!#$%^*&]{6,24}$/,
      "Password must contain at least one uppercase, lowercase, number and special character"
    ),
  // storeType: z.enum(storeEnum),
  fullName: z.coerce.string().optional(),
  address: z.coerce.string().optional(),
  userPhone: z.coerce.string().refine((value) => /^\d{10}$/i.test(value), {
    message: "Invalid phone number",
  }),
});

export const verificationSchema = object({
  token: z.coerce.string(),
});

export const newTokenSchema = object({
  userEmail: z.coerce.string().email(),
});

export const forgotPasswordSchema = object({
  userEmail: z.coerce.string().email(),
});
export const resetPasswordSchema = object({
  token: z.coerce.string(),
  userNewPassword: z
    .string()
    .min(6, "Password too short")
    .max(24, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@!#$%^*&]{6,24}$/,
      "Password must contain at least one uppercase, lowercase, number and special character"
    ),
});

export const newPasswordSchema = object({
  userEmail: z.coerce.string().email(),
  userOldPassword: z
    .string()
    .min(6, "Password too short")
    .max(24, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@!#$%^*&]{6,24}$/,
      "Password must contain at least one uppercase, lowercase, number and special character"
    ),
  userNewPassword: z
    .string()
    .min(6, "Password too short")
    .max(24, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@!#$%^*&]{6,24}$/,
      "Password must contain at least one uppercase, lowercase, number and special character"
    ),
});
