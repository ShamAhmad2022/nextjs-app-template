import * as z from "zod";

export const signUpSchema = z.object({
    first_name: z.string().min(1).max(25),
    last_name: z.string().min(1).max(25),
    email: z.string().email(),
    mobile_number: z
        .string()
        .min(4)
        .max(15)
        .refine((value) => !value.startsWith("00") && !value.startsWith("+"), {
            message: "Phone number must not start with 00 or +",
        }),
    mobile_country_code_id: z.string().min(1),
    username: z.string().min(1).max(25),
    country: z.string().min(1),
    termsAndPrivacyAgreement: z.boolean()
        .refine((val) => val === true),
    password: z.string()
        .min(6)
        .max(20)
        .refine((value) => !value.includes(" "), {
            message: "Password can't contain spaces",
        })
        .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number",
        })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: "Password must contain at least one special character",
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one capital letter",
        }),
    confirmPassword: z.string().min(1),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const forgetPassSchema = z.object({
    email: z.string().email(),
});

export const resetPassSchema = z.object({
    password: z.string()
        .min(6)
        .max(20)
        .refine((value) => !value.includes(" "), {
            message: "Password can't contain spaces",
        })
        .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number",
        })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: "Password must contain at least one special character",
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one capital letter",
        }),
    confirmNewPassword: z.string().min(1),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmNewPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmNewPassword"],
        });
    }
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type ForgetPassSchemaType = z.infer<typeof forgetPassSchema>;
export type ResetPassSchemaType = z.infer<typeof resetPassSchema>;
