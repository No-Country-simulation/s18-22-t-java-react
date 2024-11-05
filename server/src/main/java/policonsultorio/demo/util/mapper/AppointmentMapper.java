package policonsultorio.demo.util.mapper;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseIdDto;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;

@Component
@RequiredArgsConstructor
public class AppointmentMapper {

    private final ModelMapper mapper;

    public static AppointmentEntity toEntity(AppointmentRequestDto dto, Doctor doctor, Patient patient) {
        AppointmentEntity entity = new AppointmentEntity();
        entity.setDoctor(doctor);
        entity.setPatient(patient);
        entity.setDate(dto.date());
        entity.setStartTime(dto.startTime());
        //entity.setEndTime(dto.endTime());
        entity.setStatus(dto.status());

        return entity;
    }

    public static AppointmentResponseDto toDto(AppointmentEntity entity) {
        return new AppointmentResponseDto(
                entity.getId(),
                entity.getDoctor().getId(),
                entity.getPatient().getUser().getId(),
                entity.getDate(),
                entity.getStartTime(),
                entity.getEndTime(),
                entity.getStatus()
        );
    }

    public AppointmentResponseIdDto toDtoId(AppointmentEntity entity) {
        DoctorResponse doc = mapper.map(entity.getDoctor(), DoctorResponse.class);
        return new AppointmentResponseIdDto(
                entity.getId(),
                entity.getDoctor().getId(),
                entity.getPatient().getUser().getId(),
                entity.getDate(),
                entity.getStartTime(),
                entity.getEndTime(),
                entity.getStatus(),
                doc
        );
    }

    public static AppointmentRescheduleDto toDtoReschedule(AppointmentEntity entity) {
        return new AppointmentRescheduleDto(
                entity.getDate(),
                entity.getStartTime()
        );
    }


}
