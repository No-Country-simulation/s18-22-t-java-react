package policonsultorio.demo.util.Enum;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum AppointmentStatus {
    PROGRAMADA,
    COMPLETADA,
    CANCELADA,
    PENDIENTE,
    NO_ASISTIO,
    ASISTIO;

    @JsonCreator
    public static AppointmentStatus fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("Appointment status cannot be empty");
        }
        return AppointmentStatus.valueOf(value);
    }
}
