package policonsultorio.demo.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginDtoResponse(
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password
) {
}
