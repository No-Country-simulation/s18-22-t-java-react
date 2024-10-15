package policonsultorio.demo.dto.request;

import policonsultorio.demo.dto.LoginRequestDTO;

public record PatientRequestDTO(
        LoginRequestDTO user,
        String insurer
) {
}
