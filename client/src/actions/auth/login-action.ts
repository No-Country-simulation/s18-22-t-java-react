'use server'
import { schemaLogin } from '@/schemas'
import { cookies } from 'next/headers'

const BASE_URL = process.env.API_URL

export const loginUser = async (formData: FormData) => {
  const url = BASE_URL + '/user'
  const cookieStore = cookies()

  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string

  const validatedFields = schemaLogin.safeParse({
    email: emailFromForm,
    password: passwordFromForm,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al iniciar sesión.',
    }
  }

  /*   cookieStore.set(
    'user',
    JSON.stringify({
      id: 44,
      name: 'maria',
      dni: '40890678',
      password: 'test123',
      email: 'maria@gmail.com',
      social_work: 'OSDE',
      number_associate: 'B1234890',
      phone: '1589067841',
      img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png',
      active: true,
      insurer: 'OSDE',
    }),
    {
      httpOnly: true,
      path: '/',
    }
  ) */

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
    console.log('data', responseData)

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
        message: responseData.message,
      }
    }

    cookieStore.set('user', JSON.stringify(responseData), {
      httpOnly: true,
      path: '/',
    })

    return {
      success: 'Inicio de sesión exitoso',
    }
  } catch (error) {
    console.log(error)
    return {
      errors: {},
      loginError: 'Error al comunicarse con el servidor' + error,
      message: 'Algo salió mal durante el inicio de sesión.' + error,
    }
  }
}
