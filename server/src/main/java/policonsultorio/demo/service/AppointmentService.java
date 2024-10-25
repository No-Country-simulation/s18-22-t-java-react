package policonsultorio.demo.service;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.appointment.*;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.util.Enum.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentService {

    AppointmentResponseDto createAppointment(@Valid AppointmentRequestDto appointmentRequestDto);

    AppointmentResponseDto rescheduleAppointment(int id, AppointmentRescheduleDto rescheduleDto);

    AppointmentResponseDto cancelAppointment(int id);

    AppointmentResponseDto completeAppointment(int id);

    AppointmentResponseDto updateAppointment(int id, @Valid AppointmentRequestDto appointmentRequestDto);

    AppointmentResponseDto getAppointment(int id);

    PagedResponseDto<AppointmentResponseDto> getAllAppointments(int page, int size);

    PagedResponseDto<AppointmentResponseDto> getAppointmentAllByDoctor(int id_doctor, int page, int size);

    PagedResponseDto<AppointmentResponseDto> getAppointmentAllByPatient(int id_patient, int page, int size);
    Page<AppointmentResponseDto> getAppointmentByDate(LocalDate date, int page, int size);

    Page<AppointmentResponseDto> getAppointmentByStatus(AppointmentStatus status, int page, int size);

    OccupiedTimesResponseDto getOccupiedTimes (LocalDate date, int id_doctor);

    AppointmentResponseDto markAppointmentAsAttended(int id);

}
