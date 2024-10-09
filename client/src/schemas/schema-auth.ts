import { z } from "zod"

export const schemaRegister = z.object({
    userName: z.string({ message: "Name required" }).min(8, { message: "first and last name" }),
    email: z.string({ message: "Email required" }).email({ message: "Email invalid" }),
    dni: z.string({ message: "DNI required" }).min(8, ({ message: "enter a valid DNI" })).regex(/^\d+$/, { message: "DNI must contain only numbers" }),
    city: z.string(),
    direction: z.string(),
    password: z.string({ message: "Password required" }).min(6, { message: "min 6 character" }),
})

export const schemaLogin = z.object({
    email: z.string({ message: "Email required" }).email({ message: "Email invalid" }),
    password: z.string({ message: "Password required" }).min(6, { message: "min 6 character" }),
})