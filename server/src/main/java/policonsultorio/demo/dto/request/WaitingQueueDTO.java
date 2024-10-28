package policonsultorio.demo.dto.request;

import java.time.LocalDate;

public record WaitingQueueDTO(
        Long id_patient,
        Integer id_doctor,
        LocalDate requested_date
) {
}
