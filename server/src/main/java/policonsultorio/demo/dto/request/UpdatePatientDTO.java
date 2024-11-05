package policonsultorio.demo.dto.request;

public record UpdatePatientDTO(
        String social_work,
        String number_associate,
        String phone,
        String insurer,
        String image
) {
}
