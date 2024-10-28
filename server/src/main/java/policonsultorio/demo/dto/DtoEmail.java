package policonsultorio.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DtoEmail(
        @NotBlank
        @Email
        String toUser,
        @NotBlank
        String subject,
        @NotBlank
        String message) {
}
