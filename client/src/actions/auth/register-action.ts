'use server'
import { schemaRegister } from '@/schemas'

const BASE_URL = process.env.API_URL

export const createUser = async (formData: FormData) => {
  const url = BASE_URL + '/patients/create'

  const nameFromForm = formData.get('name') as string
  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string
  const phoneFromForm = formData.get('phone') as string
  const obraSocialFromForm = formData.get('obraSocial') as string
  const dniFromForm = formData.get('dni') as string
  const numeroAsociadoFromForm = formData.get('numeroAsociado') as string

  const validatedFields = schemaRegister.safeParse({
    name: nameFromForm,
    email: emailFromForm,
    password: passwordFromForm,
    phone: phoneFromForm,
    obraSocial: obraSocialFromForm,
    dni: dniFromForm,
    numeroAsociado: numeroAsociadoFromForm,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al Registrarse.',
    }
  }

  const body = {
    user: {
      name: nameFromForm,
      dni: dniFromForm,
      obraSocial: obraSocialFromForm,
      numeroAsociado: numeroAsociadoFromForm,
      email: emailFromForm,
      password: passwordFromForm,
      phone: phoneFromForm,
      img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png',
      active: true,
    },
    insurer: obraSocialFromForm,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseData = await response.json()

    if (!responseData) {
      return {
        errors: {},
        registerError: null,
        message: 'Algo salio mal...',
      }
    }

    if (responseData.message) {
      return {
        errors: {},
        registerError: responseData.message,
        message: 'Error al registrarse',
      }
    }

    return {
      success: 'Registro exitoso',
    }
  } catch (error) {
    return {
      errors: {},
      registerError: 'Error al comunicarse con el servidor' + error,
      message: 'Algo salió mal durante el registro.' + error,
    }
  }
}
