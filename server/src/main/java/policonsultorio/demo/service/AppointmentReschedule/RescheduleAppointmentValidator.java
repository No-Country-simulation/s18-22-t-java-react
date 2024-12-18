package policonsultorio.demo.service.AppointmentReschedule;

import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;

public interface RescheduleAppointmentValidator {
    void validate(AppointmentEntity appointment, AppointmentRescheduleDto rescheduleDto);
}
