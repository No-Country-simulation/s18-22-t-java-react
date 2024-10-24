const doctors = [
  {
    id: 1,
    name: 'Dr. Ignacio López',
    password: 'ignacio123',
    email: 'ignacio.lopez@gmail.com',
    phone: '1123456789',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Cardiología',
    licenseNumber: 'MP123456',
  },
  {
    id: 2,
    name: 'Dra. Valeria González',
    password: 'valeria321',
    email: 'valeria.gonzalez@gmail.com',
    phone: '1198765432',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Pediatría',
    licenseNumber: 'MP654321',
  },
  {
    id: 3,
    name: 'Maria',
    password: 'Perez',
    email: 'pr@gmail.com',
    phone: '2216149336',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Cardiología',
    licenseNumber: '1234',
  },
  {
    id: 4,
    name: 'Dr. Javier Martínez',
    password: 'javier123',
    email: 'javier.martinez@gmail.com',
    phone: '1145678901',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Cardiología',
    licenseNumber: 'MP345678',
  },
  {
    id: 5,
    name: 'Dra. Ana García',
    password: 'ana1234',
    email: 'ana.garcia@gmail.com',
    phone: '1134567890',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Traumatología',
    licenseNumber: 'MP234567',
  },
  {
    id: 6,
    name: 'Dr. Pablo Hernández',
    password: 'pablo321',
    email: 'pablo.hernandez@gmail.com',
    phone: '1144321987',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Neurología',
    licenseNumber: 'MP765432',
  },
  {
    id: 7,
    name: 'Dra. Laura Fernández',
    password: 'laura123',
    email: 'laura.fernandez@gmail.com',
    phone: '1156781234',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Dermatología',
    licenseNumber: 'MP876543',
  },
  {
    id: 8,
    name: 'Dr. Matías Torres',
    password: 'matias123',
    email: 'matias.torres@gmail.com',
    phone: '1167894321',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Traumatología',
    licenseNumber: 'MP987654',
  },
  {
    id: 9,
    name: 'Dra. Carolina Pérez',
    password: 'carolina123',
    email: 'carolina.perez@gmail.com',
    phone: '1176543210',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Traumatología',
    licenseNumber: 'MP543210',
  },
  {
    id: 10,
    name: 'Dr. Alejandro Sosa',
    password: 'alejandro123',
    email: 'alejandro.sosa@gmail.com',
    phone: '1187654321',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Pediatría',
    licenseNumber: 'MP432109',
  },
  {
    id: 11,
    name: 'Dra. Gabriela Torres',
    password: 'gabriela321',
    email: 'gabriela.torres@gmail.com',
    phone: '1198765430',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Pediatría',
    licenseNumber: 'MP654210',
  },
  {
    id: 12,
    name: 'Dr. Fernando Gómez',
    password: 'fernando123',
    email: 'fernando.gomez@gmail.com',
    phone: '1186543210',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Neurología',
    licenseNumber: 'MP543210',
  },
  {
    id: 13,
    name: 'Dra. Julia Martín',
    password: 'julia321',
    email: 'julia.martin@gmail.com',
    phone: '1176541234',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Neurología',
    licenseNumber: 'MP432156',
  },
]

const uploadDoctors = async () => {
  const url = ''

  for (const doctor of doctors) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: doctor.name,
          password: doctor.password,
          email: doctor.email,
          phone: doctor.phone,
          img: doctor.img,
          active: doctor.active,
          specialization: doctor.specialization,
          licenseNumber: doctor.licenseNumber,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`Doctor ${doctor.name} creado: `, data)
    } catch (error) {
      console.error(`Error creando al doctor ${doctor.name}: `, error)
    }
  }
}

uploadDoctors()
