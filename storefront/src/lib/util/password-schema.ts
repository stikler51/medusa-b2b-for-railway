import { z } from "zod"

export const passwordSchema = z
  .string()
  .min(8, "passwordTooShort")
  .refine((val) => /[A-Z]/.test(val), "passwordUppercase")
  .refine((val) => /[a-z]/.test(val), "passwordLowercase")
  .refine((val) => /[0-9]/.test(val), "passwordNumber")
  .refine((val) => /[@$!%*?&]/.test(val), "passwordSpecial")

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passwordsMatch",
    path: ["confirm_password"],
  })
