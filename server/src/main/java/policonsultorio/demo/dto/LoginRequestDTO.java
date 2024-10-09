package policonsultorio.demo.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank
        String name,
        @NotBlank
        String password
) {
}
