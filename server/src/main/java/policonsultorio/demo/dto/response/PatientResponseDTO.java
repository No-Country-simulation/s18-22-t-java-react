package policonsultorio.demo.dto.response;

import policonsultorio.demo.entity.Patient;

public record PatientResponseDTO(
        Long id,
        String name,
        String dni,
        String password,
        String email,
        String social_work,
        String number_associate,
        String phone,
        String img,
        Boolean active,
        String insurer
) {
    public PatientResponseDTO(Patient patient) {
        this(patient.getUser().getId(), patient.getUser().getName(),
                patient.getUser().getDni(),
                patient.getUser().getPassword(),
                patient.getUser().getEmail(), patient.getUser().getObraSocial(),
                patient.getUser().getNumeroAsociado(),
                patient.getUser().getPhone(), patient.getUser().getImg(),
                patient.getUser().getActive(), patient.getInsurer());
    }
}
