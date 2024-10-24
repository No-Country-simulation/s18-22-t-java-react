package policonsultorio.demo.dto.clinic;

import jakarta.validation.constraints.NotBlank;

public record RequestClinic(
        @NotBlank
        Long id,
        ResponseClinic responseClinic
) {
}
