"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { schemaRegister } from "@/schemas"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createUser } from "@/actions"
import { SubmitButton } from "@/ui"
import { useState } from "react"
import { useRouter } from "next/navigation";

type TypeFormData = z.infer<typeof schemaRegister>

export function RegisterForm() {

    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeFormData>({ resolver: zodResolver(schemaRegister) })

    const [success, setSuccess] = useState<string | undefined>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const submit = handleSubmit(async data => {
        console.log(data)

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('phone', data.phone)
        formData.append('insurer', data.obraSocial)
        formData.append('dni', data.dni)
        formData.append('obraSocial', data.obraSocial)
        formData.append('numeroAsociado', data.numeroAsociado)

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const result = await createUser(formData)
            console.log(result)
            setLoading(false)

            if (result.errors || result.registerError) {
                setError(result.message + ': ' + result.registerError || 'Error desconocido al iniciar sesión.')
                return
            }

            if (result.success) {
                setSuccess(result.success)

                reset({
                    email: "",
                    password: "",
                    name: "",
                    phone: "",
                    obraSocial: "",
                    dni: "",
                    numeroAsociado: ""
                })
                setTimeout(() => {
                    router.push('/dashboard')
                }, 1000)
            }

        } catch (error: unknown) {
            setLoading(false)
            setError('Ha ocurrido un error al registrarse' + error)
        }

    })

    return (
        <form onSubmit={submit} className="grid p-6 gap-4 rounded-3xl text-secondaryBlue-700">

            <h2 className="text-4xl my-2 font-medium">Formulario de Registro</h2>

            <label htmlFor="name" className="text-xl">Nombre<span className="text-red-500">*</span></label>
            <input type="text" id="name" {...register("name")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.name && (<p className="text-red-500">{errors.name.message}</p>)}

            <label htmlFor="email" className="text-xl">Email <span className="text-red-500">*</span></label>
            <input type="email" id="email" {...register("email")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

            <label htmlFor="dni">DNI<span className="text-red-500">*</span></label>
            <input type="text" id="dni" {...register("dni")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.dni && (<p className="text-red-500">{errors.dni.message}</p>)}

            <label htmlFor="phone" className="text-xl">Telefono <span className="text-red-500">*</span></label>
            <input type="text" id="phone" {...register("phone")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.phone && (<p className="text-red-500">{errors.phone.message}</p>)}

            <label htmlFor="obraSocial" className="text-xl">Aseguradora/Obra Social <span className="text-red-500">*</span></label>
            <input type="text" id="obraSocial" {...register("obraSocial")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.obraSocial && (<p className="text-red-500">{errors.obraSocial.message}</p>)}

            <label htmlFor="numeroAsociado" className="text-xl">Numero de Asociado <span className="text-red-500">*</span></label>
            <input type="text" id="numeroAsociado" {...register("numeroAsociado")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.numeroAsociado && (<p className="text-red-500">{errors.numeroAsociado.message}</p>)}
            {/* 
            <label htmlFor="city">City </label>
            <input type="text" id="city" {...register("city")} className="border" />

            <label htmlFor="direction">Direction </label>
            <input type="text" id="direction" {...register("direction")} className="border" />
 */}
            <label htmlFor="password" className="text-xl">Contraseña <span className="text-red-500">*</span></label>
            <input type="password" id="password" {...register("password")} className="min-h-9 border rounded-3xl bg-[#F6F7F7] px-4 py-2" />
            {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

            <SubmitButton loading={loading} variant="dark" loadingText="Cargando" text="Enviar" className="place-self-center mt-2" />

            {success && <p className="text-xl text-emerald-500">{success}</p>}
            {error && <p className="text-xl text-red-600">{error}</p>}
        </form>
    )
}
