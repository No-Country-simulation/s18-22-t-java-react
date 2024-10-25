'use server'
import { schemaLogin } from '@/schemas'

const BASE_URL = process.env.API_URL

export const loginUser = async (formData: FormData) => {
  const url = BASE_URL + '/user'

  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string

  const validatedFields = schemaLogin.safeParse({
    name: emailFromForm,
    password: passwordFromForm,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al iniciar sesión.',
    }
  }

  const body = {
    email: emailFromForm,
    password: passwordFromForm,
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
        loginError: null,
        message: 'Algo salió mal...',
      }
    }

    if (responseData.error) {
      return {
        errors: {},
        loginError: responseData.error,
        message: 'Error al iniciar sesión',
      }
    }

    return {
      success: 'Inicio de sesión exitoso',
    }
  } catch (error) {
    return {
      errors: {},
      loginError: 'Error al comunicarse con el servidor' + error,
      message: 'Algo salió mal durante el inicio de sesión.' + error,
    }
  }
}
