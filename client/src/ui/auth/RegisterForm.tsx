
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { schemaRegister } from "@/schemas"
import { useForm } from "react-hook-form"
import { z } from "zod"

type TypeFormData = z.infer<typeof schemaRegister>

export function RegisterForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeFormData>({ resolver: zodResolver(schemaRegister) })

    const submit = handleSubmit(data => {

        console.log(data)
        reset({
            email: "",
            password: "",
            dni: "",
            userName: ""
        })
    })

    return (
        <form onSubmit={submit} className="grid w-[500px] p-5 border gap-2">

            <label htmlFor="userName">UserName <span className="text-red-500">*</span></label>
            <input type="text" id="userName" {...register("userName")} className="border" />
            {errors.userName && (<p className="text-red-500">{errors.userName.message}</p>)}

            <label htmlFor="email">Email <span className="text-red-500">*</span></label>
            <input type="email" id="email" {...register("email")} className="border" />
            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

            <label htmlFor="dni">DNI/CC <span className="text-red-500">*</span></label>
            <input type="text" id="dni" {...register("dni")} className="border" />
            {errors.dni && (<p className="text-red-500">{errors.dni.message}</p>)}

            <label htmlFor="city">City </label>
            <input type="text" id="city" {...register("city")} className="border" />

            <label htmlFor="direction">Direction </label>
            <input type="text" id="direction" {...register("direction")} className="border" />

            <label htmlFor="password">Password <span className="text-red-500">*</span></label>
            <input type="password" id="password" {...register("password")} className="border" />
            {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}


            <button className="border">Enviar</button>

        </form>
    )
}
