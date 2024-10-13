package policonsultorio.demo.service;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseDto;
import policonsultorio.demo.util.Enum.AppointmentStatus;

import java.time.LocalDate;

public interface AppointmentService {

    AppointmentResponseDto createAppointment(@Valid AppointmentRequestDto appointmentRequestDto);

    AppointmentResponseDto cancelAppointment(int id);

    AppointmentResponseDto completeAppointment(int id);

    AppointmentResponseDto updateAppointment(int id, @Valid AppointmentRequestDto appointmentRequestDto);

    AppointmentResponseDto getAppointment(int id);

    Page<AppointmentResponseDto> getAllAppointments(int page, int size);

    Page<AppointmentResponseDto> getAppointmentByDoctor(int id_doctor, int page, int size);

    Page<AppointmentResponseDto> getAppointmentByPatient(int id_patient, int page, int size);

    Page<AppointmentResponseDto> getAppointmentByDate(LocalDate date, int page, int size);

    Page<AppointmentResponseDto> getAppointmentByStatus(AppointmentStatus status, int page, int size);

}
