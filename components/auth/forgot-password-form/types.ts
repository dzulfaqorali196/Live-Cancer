import { InferType } from "yup";
import { emailSchema, newPasswordSchema, otpSchema } from "./yup-schemas";

export type EmailFormData = InferType<typeof emailSchema>;
export type OTPFormData = InferType<typeof otpSchema>;
export type NewPasswordFormData = InferType<typeof newPasswordSchema>;
