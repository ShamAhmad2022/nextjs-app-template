import * as z from "zod";

export const updateAccountSchema = z.object({
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
});

export type UpdateAccountSchemaType = z.infer<typeof updateAccountSchema>;