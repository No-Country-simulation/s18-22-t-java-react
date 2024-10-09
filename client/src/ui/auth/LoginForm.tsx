"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { schemaLogin } from "@/schemas"
import { useForm } from "react-hook-form"
import { z } from "zod"

type TypeFormData = z.infer<typeof schemaLogin>

export function LoginForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeFormData>({ resolver: zodResolver(schemaLogin) })

    const submit = handleSubmit(data => {

        console.log(data)
        reset({
            email: "",
            password: "",
        })
    })

    return (
        <form onSubmit={submit} className="grid w-[500px] p-5 border gap-2">

            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} className="border" />
            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

            <label htmlFor="password">Password </label>
            <input type="password" id="password" {...register("password")} className="border" />
            {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

            <button className="border">Enviar</button>
        </form>
    )
}
