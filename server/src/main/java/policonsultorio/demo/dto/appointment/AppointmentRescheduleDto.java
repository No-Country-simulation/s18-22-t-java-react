package policonsultorio.demo.dto.appointment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(
        name = "AppointmentRescheduleDto",
        description = "Data transfer object for rescheduling an appointment"
)
public record AppointmentRescheduleDto(
        @Schema(description = "New appointment date", example = "2025-01-01", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "New appointment date is required")
        @FutureOrPresent(message = "Appointment date must be today or in the future")
        LocalDate newDate,

        @Schema(description = "New appointment start time", example = "10:00", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "New appointment start time is required")
        LocalTime newStartTime

        /*@Schema(description = "New appointment end time", example = "11:00", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "New appointment end time is required")
        LocalTime newEndTime*/
) {
}
