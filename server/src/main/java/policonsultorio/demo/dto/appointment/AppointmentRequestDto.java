package policonsultorio.demo.dto.appointment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import policonsultorio.demo.util.Enum.AppointmentStatus;
//import policonsultorio.demo.util.validation.EnumNamePattern;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(
    name = "AppointmentRequestDto",
    description = "Data transfer object for creating an appointment")
public record AppointmentRequestDto(

        @Schema(description = "Doctor ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "Doctor ID is required")
        Integer id_doctor,

        @Schema(description = "Patient ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "Patient ID is required")
        Integer id_patient,

        @Schema(description = "Appointment date", example = "2025-01-01", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "Appointment date is required")
        @FutureOrPresent(message = "Appointment date must be today or in the future")
        LocalDate date,

        @Schema(description = "Appointment start time", example = "10:00", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull(message = "Appointment start time is required")
        LocalTime startTime,

        /*@Schema(description = "Appointment end time", example = "11:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        LocalTime endTime,*/

        @Schema(description = "Appointment status", example = "PROGRAMADA", requiredMode = Schema.RequiredMode.REQUIRED)
        AppointmentStatus status
) {
}
