package policonsultorio.demo.dto.clinic;


import jakarta.validation.constraints.NotBlank;
import policonsultorio.demo.entity.Clinic;

public record ResponseClinic(
        @NotBlank
        String name,
        @NotBlank
        String cuit,
        @NotBlank
        String address,
        @NotBlank
        String phone,

        String description,

        String vlinicImage,
        boolean active
        ) {
        public ResponseClinic(Clinic clinic) {
                this(clinic.getName(),clinic.getCuit(),clinic.getAddress(),clinic.getCuit(),clinic.getDescription(),clinic.getVlinicImage(), clinic.getActive());
        }
}
