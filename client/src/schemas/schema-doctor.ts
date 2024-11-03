import { z } from 'zod'

export const SchemaDoctor = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Número de teléfono no válido'),
})
