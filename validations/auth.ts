import { z } from "zod"

export const loginSchema = z.object({
    identifier: z.string().min(1, { message: "Please enter an email or username." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
}).transform((data, ctx) => {
    const isEmail = z.email().safeParse(data.identifier).success

    if (isEmail) {
        return { identifier: data.identifier, password: data.password, type: "email" as const }
    }

    if (data.identifier.length < 3) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username must be at least 3 characters.",
            path: ["identifier"],
        })
        return z.NEVER
    }

    return { identifier: data.identifier, password: data.password, type: "username" as const }
})

export const signupSchema = z.object({
    firstName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.email({
        message: "Please enter a valid email address.",
    }),
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export type SignupInput = z.infer<typeof signupSchema>

export type LoginFormValues = {
    identifier: string
    password: string
    type: "email" | "username"
}