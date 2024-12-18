package policonsultorio.demo.service.AppointmentReschedule;

import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.util.exception.appointment.AppointmentTimeRestrictionException;

import java.time.LocalDateTime;

@Component
public class AppointmentTimeRestrictionValidator implements RescheduleAppointmentValidator{

    @Override
    public void validate(AppointmentEntity appointment, AppointmentRescheduleDto rescheduleDto) {
        LocalDateTime appointmentDateTime = LocalDateTime.of(appointment.getDate(), appointment.getStartTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (appointmentDateTime.isBefore(currentTime.plusHours(24))) {
            throw new AppointmentTimeRestrictionException("Appointments can only be rescheduled with at least 24 hours in advance.");
        }
    }
}
