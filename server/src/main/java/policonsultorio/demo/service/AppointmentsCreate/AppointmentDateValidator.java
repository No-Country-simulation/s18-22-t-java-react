package policonsultorio.demo.service.AppointmentsCreate;

import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.util.exception.appointment.AppointmentDateException;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class AppointmentDateValidator implements AppointmentValidator{
    @Override
    public void validate(AppointmentRequestDto appointmentRequestDto, Doctor doctor, Patient patient) {
        LocalDateTime appointmentDateTime = LocalDateTime.of(appointmentRequestDto.date(), appointmentRequestDto.startTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (appointmentDateTime.isBefore(currentTime)) {
            throw new AppointmentDateException("The appointment time cannot be in the past. Please select a future time.");
        }

        if (appointmentRequestDto.date().isBefore(LocalDate.now())) {
            throw new AppointmentDateException("The appointment date cannot be in the past. Please select a future date.");
        }

        if (!TimeSlotValidator.isValidTime(appointmentRequestDto.startTime())) {
            throw new RuntimeException("The start time must be a valid time between 07:00 and 18:00 (e.g., 10:00, 10:30, etc.).");
        }

    }
}
