"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SchemaDoctor } from "@/schemas"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SubmitButton } from "@/ui"
import { useState } from "react"
import { IconPencil } from "../icons"
import { DoctorFromResponse } from "@/interfaces/user"
import Image from "next/image"
import { uploadSingleImage } from "@/actions/images/ImageActions"
import { BackButton } from "../BackButton"
import { editDoctor } from "@/actions/doctors/doctorActions"

type TypeFormData = z.infer<typeof SchemaDoctor>

interface Props {
  doctor: DoctorFromResponse
}

export function EditDoctorForm({ doctor }: Props) {

  const { register, handleSubmit, formState: { errors } } = useForm<TypeFormData>({
    resolver: zodResolver(SchemaDoctor)
  })

  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [profileImg, setProfileImg] = useState<string>(doctor ? doctor.img : '')


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const image = await uploadSingleImage(file)
      setProfileImg(image)
    }
  }

  const submit = handleSubmit(async (data) => {
    console.log("submit function called")
    console.log('data', data)

    const formData = new FormData()
    formData.append("name", doctor.name || '')
    formData.append("phone", doctor.phone || '')
    formData.append("email", doctor.email || '')
    formData.append("img", profileImg)
    formData.append("password", doctor.password || '')
    formData.append("licenseNumber", doctor.licenseNumber || '')
    formData.append("specialization", doctor.specialization || '')
    /*     formData.append("establishment", data.establishment)*/
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await editDoctor(formData, doctor)
      console.log('response', response)

      if (response.errors || response.updateError) {
        setError(response.message + ': ' + response.updateError || 'Error desconocido al actualizar el doctor.')
        setLoading(false)
        return
      }

      if (response.success) {
        setSuccess(response.success)
        setLoading(false)
      }

      setSuccess("Doctor actualizado correctamente")
      setLoading(false)
    } catch (error: unknown) {
      setLoading(false)
      setError("Ha ocurrido un error al actualizar: " + error)
    }
  })

  return (
    <>
      <BackButton />
      <form onSubmit={submit} className="max-w-5xl grid p-6 gap-4 text-[#1A2C33]">
        <h2 className="text-[32px] font-medium mb-4">Mi perfil</h2>
        <div className="flex my-4 mb-11 gap-7">
          <div className='flex flex-col gap-2 relative'>
            <input
              type='file'
              name='imagenProfile'
              id='imagenProfile'
              title='imagenProfile'
              onChange={handleFileChange}
              className='invisible w-0 h-0'
            />
            <label htmlFor='imagenProfile' className="cursor-pointer size-[100px]">
              {profileImg ? <Image
                width={500}
                height={500}
                className="rounded-full size-[100px] absolute z-10"
                src={profileImg}
                alt='Profile Image uploaded'
              /> : <Image
                width={500}
                height={500}
                className="rounded-full size-[100px] absolute"
                src={'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png'}
                alt='Subir imagen'
                title="Subir Imagen"
              />}
              <span className="absolute -bottom-7 text-base w-full text-center font-medium">Editar Foto</span>
            </label>
          </div>
          <p className="text-[22px] font-medium content-center mb-7 text-black">{doctor ? doctor.name : '[Nombre Completo]'}</p>
        </div>

        <h3 className="text-2xl my-2 font-medium">Datos Personales</h3>
        <div className="flex flex-wrap gap-4">

          {/* Campos editables */}
          <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="name">Nombre Completo</label>
            <input type="text" id="name" {...register("name")} defaultValue={doctor ? doctor.name : ''} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
            <IconPencil className="absolute top-[46px] right-3" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="phone">Número de teléfono</label>
            <input type="text" id="phone" {...register("phone")} defaultValue={doctor ? doctor.phone : ''} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
            <IconPencil className="absolute top-[46px] right-3" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} defaultValue={doctor ? doctor.email : ''} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
            <IconPencil className="absolute top-[46px] right-3" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Campos deshabilitados */}
          <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="dni">DNI</label>
            <input type="text" id="dni" defaultValue={doctor ? doctor.dni : '12123112'} disabled className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          </div>

          <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="licenseNumber">Número de matrícula</label>
            <input type="text" id="licenseNumber" defaultValue={doctor ? doctor.licenseNumber : '123123'} disabled className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          </div>

          <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="specialization">Especialidad</label>
            <input type="text" id="specialization" defaultValue={doctor ? doctor.specialization : 'Cardiologo'} disabled className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          </div>

          {/*           <div className="w-[420px] flex flex-col gap-[10px] relative">
            <label className="font-medium" htmlFor="establishment">Establecimiento</label>
            <input type="text" id="establishment" defaultValue={'Clinica Colon 2176'} disabled className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          </div> */}
        </div>

        <SubmitButton loading={loading} variant="dark" loadingText="Cargando" text="Guardar" className="mt-2" />
        {success && <p className="text-xl text-emerald-500">{success}</p>}
        {error && <p className="text-xl text-red-600">{error}</p>}
      </form>
    </>
  )
}
