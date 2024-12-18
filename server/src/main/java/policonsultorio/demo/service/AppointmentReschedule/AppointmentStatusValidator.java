package policonsultorio.demo.service.AppointmentReschedule;

import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.exception.appointment.AppointmentAlreadyCancelledException;
import policonsultorio.demo.util.exception.appointment.AppointmentAlreadyCompletedException;

@Component
public class AppointmentStatusValidator implements RescheduleAppointmentValidator{
    @Override
    public void validate(AppointmentEntity appointment, AppointmentRescheduleDto rescheduleDto) {
        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Cannot reschedule a cancelled appointment");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Cannot reschedule a completed appointment");
        }
    }
}
