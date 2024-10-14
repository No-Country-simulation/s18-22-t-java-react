package policonsultorio.demo.util.mapper;

import jakarta.validation.Valid;
import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;

@Component
public class AppointmentMapper {
    public static AppointmentEntity toEntity(AppointmentRequestDto dto, Doctor doctor, Patient patient) {
        AppointmentEntity entity = new AppointmentEntity();
        entity.setDoctor(doctor);
        entity.setPatient(patient);
        entity.setDate(dto.date());
        entity.setStartTime(dto.startTime());
        entity.setEndTime(dto.endTime());
        entity.setStatus(dto.status());

        return entity;
    }

    public static AppointmentResponseDto toDto(AppointmentEntity entity) {
        return new AppointmentResponseDto(
                entity.getId(),
                entity.getDoctor().getId(),
                entity.getPatient().getId(),
                entity.getDate(),
                entity.getStartTime(),
                entity.getEndTime(),
                entity.getStatus()
        );
    }

    public static AppointmentRescheduleDto toDtoReschedule(AppointmentEntity entity) {
        return new AppointmentRescheduleDto(
                entity.getDate(),
                entity.getStartTime(),
                entity.getEndTime()
        );
    }


}
