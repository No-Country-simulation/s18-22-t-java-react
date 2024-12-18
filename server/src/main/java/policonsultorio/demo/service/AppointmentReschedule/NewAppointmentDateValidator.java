package policonsultorio.demo.service.AppointmentReschedule;

import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.util.exception.appointment.AppointmentDateException;
import policonsultorio.demo.util.exception.appointment.AppointmentTimeException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
public class NewAppointmentDateValidator implements RescheduleAppointmentValidator{

    @Override
    public void validate(AppointmentEntity appointment, AppointmentRescheduleDto rescheduleDto) {
        LocalDateTime newAppointmentDateTime = LocalDateTime.of(rescheduleDto.newDate(), rescheduleDto.newStartTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (newAppointmentDateTime.isBefore(currentTime)) {
            throw new AppointmentDateException("The new appointment time cannot be in the past. Please select a future time.");
        }

        if (!TimeSlotValidator.isValidTime(rescheduleDto.newStartTime())) {
            throw new RuntimeException("The start time must be a valid time between 07:00 and 18:00 (e.g., 10:00, 10:30, etc.).");
        }

        if (rescheduleDto.newDate().isBefore(LocalDate.now())) {
            throw new AppointmentDateException("The appointment date cannot be in the past. Please select a future date.");
        }


        LocalTime calculatedEndTime = rescheduleDto.newStartTime().plusMinutes(30);

        if (rescheduleDto.newStartTime().isAfter(calculatedEndTime)) {
            throw new AppointmentTimeException("The start time must be before the end time. Please adjust the time range.");
        }
    }
}
