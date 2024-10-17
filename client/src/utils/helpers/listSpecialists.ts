
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
        title: "Traumatología",
        specialists: [
            { name: "Dra. Mónica Gonzalez", specialty: "Traumatóloga", date: "Próximo turno disponible: 20/10 - 14:00 hs." },
            { name: "Dra. Mónica Gonzalez", specialty: "Traumatóloga", date: "Próximo turno disponible: 20/10 - 14:00 hs." },
            { name: "Dra. Mónica Gonzalez", specialty: "Traumatóloga", date: "Próximo turno disponible: 20/10 - 14:00 hs." },
        ]
    },
    {
        title: "Dermatología",
        specialists: [
            { name: "Dra. Mónica Gonzalez", specialty: "Traumatóloga", date: "Próximo turno disponible: 20/10 - 14:00 hs." },
            { name: "Dra. Mónica Gonzalez", specialty: "Traumatóloga", date: "Próximo turno disponible: 20/10 - 14:00 hs." },
            { name: "Dra. Mónica Gonzalez", specialty: "Traumatóloga", date: "Próximo turno disponible: 20/10 - 14:00 hs." },
        ]
    }
]