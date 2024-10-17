package policonsultorio.demo.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LoginDtoResponse(
        @NotBlank
        String name,
        @NotBlank
        String password
) {
}
