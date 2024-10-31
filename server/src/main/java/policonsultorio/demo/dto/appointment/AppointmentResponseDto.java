package policonsultorio.demo.dto.appointment;

import io.swagger.v3.oas.annotations.media.Schema;
import policonsultorio.demo.util.Enum.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(
    name = "AppointmentResponseDto",
    description = "Data transfer object for appointment response")
public record AppointmentResponseDto(
    @Schema(description = "Appointment ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    int id,
    @Schema(description = "Doctor ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    Long id_doctor,
    @Schema(description = "Patient ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    Long id_patient,
    @Schema(description = "Appointment date", example = "2025-01-01", requiredMode = Schema.RequiredMode.REQUIRED)
    LocalDate date,
    @Schema(description = "Appointment start time", example = "09:00", requiredMode = Schema.RequiredMode.REQUIRED)
    LocalTime startTime,
    @Schema(description = "Appointment end time", example = "11:00", requiredMode = Schema.RequiredMode.REQUIRED)
    LocalTime endTime,
    @Schema(description = "Appointment status", example = "PROGRAMADA", requiredMode = Schema.RequiredMode.REQUIRED)
    AppointmentStatus status
) {
}
