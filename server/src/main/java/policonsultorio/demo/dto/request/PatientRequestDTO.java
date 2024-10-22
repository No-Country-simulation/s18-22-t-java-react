package policonsultorio.demo.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import policonsultorio.demo.dto.LoginRequestDTO;

public record PatientRequestDTO(
        @Valid
        LoginRequestDTO user,
        @NotBlank
        String insurer
) {
}
