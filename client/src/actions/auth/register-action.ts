'use server'
import { schemaRegister } from '@/schemas'

export const createUser = async (formData: FormData) => {
  const url = 'https://clinica-medica-production.up.railway.app/patients/create'

  const nameFromForm = formData.get('name') as string
  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string
  const phoneFromForm = formData.get('phone') as string
  const insurerFromForm = formData.get('insurer') as string

  const validatedFields = schemaRegister.safeParse({
    name: nameFromForm,
    email: emailFromForm,
    password: passwordFromForm,
    phone: phoneFromForm,
    insurer: insurerFromForm,
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
      email: emailFromForm,
      password: passwordFromForm,
      phone: phoneFromForm,
      img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png',
      active: true,
    },
    insurer: insurerFromForm,
  }

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
}
