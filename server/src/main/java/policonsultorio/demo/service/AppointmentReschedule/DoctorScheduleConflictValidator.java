package policonsultorio.demo.service.AppointmentReschedule;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.repository.AppointmentRepository;
import policonsultorio.demo.util.exception.appointment.AppointmentConflictException;

import java.time.LocalTime;

@Component
@RequiredArgsConstructor
public class DoctorScheduleConflictValidator implements RescheduleAppointmentValidator {

    private final AppointmentRepository appointmentRepository;

    @Override
    public void validate(AppointmentEntity appointment, AppointmentRescheduleDto rescheduleDto) {
        LocalTime calculatedEndTime = rescheduleDto.newStartTime().plusMinutes(30);

        if (appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                appointment.getDoctor(), rescheduleDto.newDate(), rescheduleDto.newStartTime(), calculatedEndTime)) {
            throw new AppointmentConflictException("Doctor already has an appointment at the specified time");
        }
    }
}
