package policonsultorio.demo.dto.response;

import policonsultorio.demo.entity.Patient;

public record PatientResponseDTO(
        Long id,
        String name,
        String password,
        String email,
        String phone,
        String img,
        Boolean active,
        String insurer
) {
    public PatientResponseDTO(Patient patient) {
        this(patient.getUser().getId(), patient.getUser().getName(), patient.getUser().getPassword(),
                patient.getUser().getEmail(), patient.getUser().getPhone(), patient.getUser().getImg(),
                patient.getUser().getActive(), patient.getInsurer());
    }
}
