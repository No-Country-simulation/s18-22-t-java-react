package policonsultorio.demo.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.repository.AppointmentRepository;
import policonsultorio.demo.service.AppointmentService;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.exception.appointment.*;
import policonsultorio.demo.util.mapper.AppointmentMapper;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    @Override
    @Transactional
    public AppointmentResponseDto createAppointment(AppointmentRequestDto appointmentRequestDto) {
        /*DoctorEntity doctor = doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        PatientEntity patient = patientRepository.findById(appointmentRequestDto.id_patient())
                .orElseThrow(() -> new RuntimeException("Patient not found"));*/

        AppointmentEntity entity = AppointmentMapper.toEntity(appointmentRequestDto /*doctor, patient*/);

        entity = appointmentRepository.save(entity);

        return AppointmentMapper.toDto(entity);
    }

    @Override
    @Transactional
    public AppointmentResponseDto cancelAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Appointment is already cancelled");
        }

        appointment.setStatus(AppointmentStatus.CANCELADA);
        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);
    }

    @Override
    @Transactional
    public AppointmentResponseDto completeAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Appointment is already completed");
        }

        appointment.setStatus(AppointmentStatus.COMPLETADA);
        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);
    }


    @Override
    @Transactional
    public AppointmentResponseDto updateAppointment(int id, AppointmentRequestDto appointmentRequestDto) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Appointment is cancelled");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Appointment is completed");
        }

        /*appointment.setDoctor(doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new RuntimeException("Doctor not found")));
        appointment.setPatient(patientRepository.findById(appointmentRequestDto.id_patient())
                .orElseThrow(() -> new RuntimeException("Patient not found")));*/
        appointment.setDate(appointmentRequestDto.date());
        appointment.setStartTime(appointmentRequestDto.startTime());
        appointment.setEndTime(appointmentRequestDto.endTime());
        appointment.setStatus(appointmentRequestDto.status());
        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);

    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentResponseDto getAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);
        return AppointmentMapper.toDto(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentResponseDto> getAllAppointments(int page, int size) {
        if (page < 0 ) {
            throw new InvalidPageNumberException("Invalid page number");
        }
        if (size < 0) {
            throw new InvalidPageSizeException("Invalid page size");
        }
        Page<AppointmentEntity> appointments = appointmentRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        return appointments.map(AppointmentMapper::toDto);
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByDoctor(int id_doctor, int page, int size) {
        return null;
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByPatient(int id_patient, int page, int size) {
        return null;
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByDate(LocalDate date, int page, int size) {
        return null;
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByStatus(AppointmentStatus status, int page, int size) {
        return null;
    }

    private AppointmentEntity findAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));
    }

}
