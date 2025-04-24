import * as yup from "yup";

export const emailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP harus diisi")
    .matches(/^[0-9]{6}$/, "OTP harus berupa 6 digit angka"),
});

export const newPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});
