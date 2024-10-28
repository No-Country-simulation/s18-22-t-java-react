interface ListSpecialists {
  title: string
  specialists: Specialists[]
}

interface Specialists {
  name: string
  specialty: string
  date: string
}

export const listSpecialists: ListSpecialists[] = [
  {
    title: 'Traumatología',
    specialists: [
      {
        name: 'Dr. Juan Pérez',
        specialty: 'Traumatólogo',
        date: 'Próximo turno disponible: 4/11 - 10:00 hs.',
      },
      {
        name: 'Dra. Ana López',
        specialty: 'Traumatóloga',
        date: 'Próximo turno disponible: 5/11 - 11:00 hs.',
      },
      {
        name: 'Dr. Carlos Martínez',
        specialty: 'Traumatólogo',
        date: 'Próximo turno disponible: 5/11 - 12:00 hs.',
      },
    ],
  },
  {
    title: 'Dermatología',
    specialists: [
      {
        name: 'Dra. Laura Fernández',
        specialty: 'Dermatóloga',
        date: 'Próximo turno disponible: 6/11 - 09:00 hs.',
      },
      {
        name: 'Dr. Pedro Gómez',
        specialty: 'Dermatólogo',
        date: 'Próximo turno disponible: 7/11 - 10:00 hs.',
      },
      {
        name: 'Dra. María Rodríguez',
        specialty: 'Dermatóloga',
        date: 'Próximo turno disponible: 8/11 - 11:00 hs.',
      },
    ],
  },
]
