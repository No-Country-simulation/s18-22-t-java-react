package policonsultorio.demo.dto.response;

import java.time.LocalDate;

public record WaitingQueueResponse(
        String name_doctor,
        String speciality,
        LocalDate date,
        String name_clinic,
        String address
) {
}
