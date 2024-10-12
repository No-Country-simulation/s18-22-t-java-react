package policonsultorio.demo.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        Long id,
        @NotBlank
        String name,
        @NotBlank
        String password,
        @NotBlank
        String email,
        @NotBlank
        String phone,
        String img
) {
}
