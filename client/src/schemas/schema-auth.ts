import { z } from 'zod'

export const schemaRegister = z.object({
  name: z
    .string({ message: 'Nombre requerido' })
    .min(8, { message: 'Rellene con su Nombre completo' }),
  email: z
    .string({ message: 'Email requerido' })
    .email({ message: 'Email invalido' }),
  phone: z
    .string({ message: 'Telefono requerido' })
    .min(10, { message: 'Numero de telefono debe tener al menos 10 digitos' })
    .regex(/^\d+$/, { message: 'Phone must contain only numbers' }),
  obraSocial: z.string({ message: 'Aseguradora u Obra social requerida' }),
  password: z
    .string({ message: 'Contraseña requerido' })
    .min(6, { message: 'Minimo 6 Caracteres' }),
  numeroAsociado: z.string({ message: 'Numero de asociado requerido' }),
  dni: z
    .string({
      message: 'DNI requerido',
    })
    .min(7, { message: 'DNI debe tener al menos 7 digitos' })
    .max(8, { message: 'DNI debe tener como maximo 8 digitos' }),
  img: z.string().optional(),
})

export const schemaLogin = z.object({
  email: z
    .string({ message: 'Email requerido' })
    .email({ message: 'Email invalido' }),
  password: z
    .string({ message: 'Contraseña requerido' })
    .min(6, { message: 'Minimo 6 Caracteres' }),
})
