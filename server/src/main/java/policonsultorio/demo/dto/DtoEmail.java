package policonsultorio.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DtoEmail(
        @NotBlank
        @Email
        String email,
        @NotBlank
        String titulo,
        @NotBlank
        String mensaje) {
}
